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

const LargeList = ({ commentPrefix, error = false }) => {
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getPostsAndComments = async () => {
            const postsResponse = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );

            const postsJson = await postsResponse.json();

            setPosts(postsJson);

            const commentsResponse = await fetch(
                "https://jsonplaceholder.typicode.com/comments"
            );
            const commentsJson = await commentsResponse.json();

            setComments(commentsJson);
        }
        getPostsAndComments();
    }, []);

    /* get all comments by postId */
    const findRelatedComments = (postId: number) => {
        return comments.filter((comment) => comment.postId === postId);


    };
    // собрать мапу с комментами?

    // несколько main? семантика
    // нэйминг стилей?
    // бэм?
    // keys
    return (
        <div>
            {/* render posts */}
            {posts.map(({ title, body, id }) => (
                <main className="post">
                    <h1 className="post-Item_red">{title}</h1>
                    <p>{body}</p>
                    <hr />
                    {/* render comments list */}
                    <ul className="postList">
                        {findRelatedComments(id).map(({ body }) => (
                            <div className="post__header">
                                {commentPrefix} {body}
                            </div>
                        ))}
                    </ul>
                </main>
            ))}
        </div>
    );
};

var loaded = false;
var value = 0;

const AppWithCounter = () => {
    const [counter, setCounter] = useState(0);
    let commentPrefix = "*";
    // просто написать commentPrefix="*" в пропсах?

    const increase = () => {
        setCounter(++value);
        // добавить прев стейт чтобы получалось актуальное значение
    };

    useEffect(() => {
        if (!loaded) {
            setInterval(increase, 1000);
            // отсутсвие массива зависимостей, интервал бесконечный
        }

        loaded = true;
        // кинуть в реф, непредсказуемо
    });

    return (
        <div>
            seconds elapsed: {counter}
            <div>
                <LargeList commentPrefix={commentPrefix} />
            </div>
        </div>
    );
};

// don't change
ReactDOM.render(<AppWithCounter />, document.getElementById("root"));

setTimeout(() => console.clear(), 1000);
