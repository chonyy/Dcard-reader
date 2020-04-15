import React, { Component } from "react";
import Post from "./Components/Post";
import ReaderModal from "./Components/ReaderModal";
import "./Dcard.css";

export default class Dcard extends Component {
    //declaration
    myref;
    intersectionObserver;

    constructor(props) {
        super(props);
        //binding functions
        this.openReaderModal = this.openReaderModal.bind(this);
        this.closeReaderModal = this.closeReaderModal.bind(this);
        //creating reference to perform infinite scroll
        this.myref = React.createRef();
        this.state = {
            posts: [],
            postsDisplayed: 6,
            readerModal: {
                isOpened: false,
                postId: 0,
                title: "",
                content: "",
            },
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            let ratio = entries[0].intersectionRatio;
            //ratio will be 1 when scrollng to buttom
            if (ratio > 0)
                this.setState({
                    postsDisplayed: this.state.postsDisplayed + 4,
                });
        });
    }

    componentDidMount() {
        this.intersectionObserver.observe(this.myref.current);
        //fetching data only once at the beginning
        fetch("https://www.dcard.tw/_apicors/posts?popular=true")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    posts: json,
                });
            });
    }

    openReaderModal(id) {
        //fectching post data from API
        fetch(`https://www.dcard.tw/_apicors/posts/${id}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    readerModal: {
                        isOpened: true,
                        postId: json.id,
                        title: json.title,
                        content: json.content,
                    },
                });
            });
        //when modal is shown, disable scrolling on body
        document.body.style.overflow = "hidden";
    }

    closeReaderModal() {
        document.body.style.overflowY = "scroll";
        this.setState({ readerModal: { isOpened: false } });
    }

    render() {
        //getting specific number of posts depending on how much the user scrolled
        let posts = this.state.posts.slice(0, this.state.postsDisplayed);
        let readerModal = this.state.readerModal;

        return (
            <div>
                <div className="postsList-container">
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            data={post}
                            openReaderModal={this.openReaderModal}
                        ></Post>
                    ))}
                </div>
                <ReaderModal
                    key={readerModal.postId}
                    readerModal={readerModal}
                    closeReaderModal={this.closeReaderModal}
                ></ReaderModal>
                {/* ref guarantees to be updated before compoenentDidMount */}
                <div ref={this.myref}></div>
            </div>
        );
    }
}
