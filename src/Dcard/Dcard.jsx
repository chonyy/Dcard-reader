import React, { Component } from "react";
import Post from "./Post";
import "./Dcard.css";

export default class Dcard extends Component {
    myref;
    intersectionObserver;

    constructor(props) {
        super(props);
        this.myref = React.createRef();
        this.state = {
            posts: [],
            count: 3,
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            var ratio = entries[0].intersectionRatio;
            console.log("ratio", ratio);
            if (ratio > 0) this.setState({ count: this.state.count + 5 });
        });
    }

    componentDidMount() {
        console.log(this.myref);
        this.intersectionObserver.observe(this.myref.current);

        fetch("https://www.dcard.tw/_apicors/posts?popular=true")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    posts: json,
                });
            });
    }

    render() {
        var posts = this.state.posts.slice(0, this.state.count);

        return (
            <div>
                <div className="container">
                    {posts.map((post) => (
                        <Post key={post.id} data={post}></Post>
                    ))}
                </div>
                <div ref={this.myref}></div>
            </div>
        );
    }
}
