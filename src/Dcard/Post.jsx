import React, { Component } from "react";
import "./Post.css";

export default class Post extends Component {
    render() {
        let post = this.props.data;

        return (
            <div className="post-container">
                <div className="title">{post.title}</div>
                <div className="excerpt">{post.excerpt}</div>
            </div>
        );
    }
}
