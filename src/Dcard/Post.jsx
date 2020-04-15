import React, { Component } from "react";
import "./Post.css";

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: this.props.data,
        };
    }

    render() {
        let post = this.state.post;

        return (
            <article className="post-container">
                <div
                    className="content-container"
                    onClick={() => this.props.openReader(post.id)}
                >
                    <div className="title">{post.title}</div>
                    <div className="excerpt">{post.excerpt}</div>
                </div>
            </article>
        );
    }
}
