import React, { Component } from "react";
import Post from "./Post";
import ReaderModal from "./ReaderModal";
import "./Dcard.css";

export default class Dcard extends Component {
    //declaration
    myref;
    intersectionObserver;

    constructor(props) {
        super(props);
        this.openReader = this.openReader.bind(this);
        this.closeReader = this.closeReader.bind(this);
        this.myref = React.createRef();
        this.state = {
            posts: [],
            postsDisplayed: 6,
            readerModal: {
                isOpened: false,
                id: 0,
                title: "",
                content: "",
            },
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            var ratio = entries[0].intersectionRatio;

            //ratio will be 1 when scrollng to buttom
            if (ratio > 0)
                this.setState({
                    postsDisplayed: this.state.postsDisplayed + 4,
                });
        });
    }

    openReader(id) {
        fetch(`https://www.dcard.tw/_apicors/posts/${id}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    readerModal: {
                        isOpened: true,
                        id: json.id,
                        title: json.title,
                        content: json.content,
                    },
                });
            });

        document.body.style.overflow = "hidden";
    }

    closeReader() {
        document.body.style.overflowY = "scroll";
        this.setState({ readerModal: { isOpened: false } });
    }

    componentDidMount() {
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
        let posts = this.state.posts.slice(0, this.state.postsDisplayed);
        let readerModal = this.state.readerModal;

        return (
            <div>
                <div className="postsList-container">
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            data={post}
                            openReader={this.openReader}
                        ></Post>
                    ))}
                </div>
                <ReaderModal
                    key={readerModal.id}
                    readerContent={readerModal}
                    closeReader={this.closeReader}
                ></ReaderModal>
                {/* ref guarantees to be updated before compoenentDidMount */}
                <div ref={this.myref}></div>
            </div>
        );
    }
}
