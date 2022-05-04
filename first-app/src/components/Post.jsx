import React from 'react';
import MyButton from "./UI/button/MyButton";

const Post = (props) => {
    return (
        <div className="post">
            <div className='post__content'>
                <strong>{props.post.id} {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post__btns'>
                <MyButton onClick={() => props.remove(props.post)}>
                    Del Post
                </MyButton>
            </div>

        </div>
    );
};

export default Post;