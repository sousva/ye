/* eslint-disable */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

interface CommentsList {
    [comment: number]: Comment[]
}

const LargeList = ({ commentPrefix, error = false }) => {
    // different syntax
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<CommentsList>({});

    // hook rules
    /* fetch data */
    // @ts-ignore
    // syntax
    useEffect(() => {
        const fetchPostsAndComments = async () => {
            const postsResponse = fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const commentsResponse = fetch(
                "https://jsonplaceholder.typicode.com/comments"
            );

            const results = await Promise.all([postsResponse, commentsResponse])
            const [postsRes, commentsRes] = results

            const postsJson = await postsRes.json();

            setPosts(postsJson);

            const commentsJson = await commentsRes.json();

            const commentsWithPostId = commentsJson.reduce((acc, el) => {
                if (acc[el.postId]?.length) {
                    acc[el.postId] = [...acc[el.postId], el]
                } else {
                    acc[el.postId] = [el]
                }

                return acc
            }, {})

            setComments(commentsWithPostId);
        }

        fetchPostsAndComments()
    }, []);

    /* get all comments by postId */
    // overcomplicated logic, replace to filter?

    // map without key
    // weird styles
    // bem
    return (
        <div>
            {/* render posts */}
            {posts.map(({ title, body, id }) => (
                <article key={id} className="post">
                    <h2 className="post__header">{title}</h2>
                    <p>{body}</p>
                    <hr />
                    {/* render comments list */}
                    <ul className="post-comment">
                        {comments[id]?.map(({ body: commentBody, id: commentId }) => (
                            <li key={commentId} className="post-comment__body">
                                {commentPrefix}
                                <span> {commentBody}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </div>
    );
};

// var loaded = false;
// remove value?
// var value = 0;

const AppWithCounter = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCounter(prev => prev + 1), 1000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <div>
            seconds elapsed: {counter}
            <div>
                <LargeList commentPrefix={"*"} />
            </div>
        </div>
    );
};

// don't change
ReactDOM.render(<AppWithCounter />, document.getElementById("root"));

setTimeout(() => console.clear(), 1000);
