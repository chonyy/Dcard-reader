import React, { Component } from "react";
import "./ReaderModal.css";

export default class ReaderModal extends Component {
    render() {
        let readerModal = this.props.readerContent;
        let backgroundClass =
            "reader-background " + (!readerModal.isOpened ? "hide" : "");
        let readerClass =
            "post-reader " + (!readerModal.isOpened ? "hide" : "");
        let title = readerModal.isOpened ? readerModal.title : "";
        let content = readerModal.isOpened ? readerModal.content : "";

        return (
            <div className="reader-container">
                <div
                    className={backgroundClass}
                    onClick={() => this.props.closeReader()}
                ></div>
                <div className={readerClass}>
                    <div className="reader-title">{title}</div>
                    <div className="reader-content">
                        {content.split("\n").map((line, i) => {
                            return <p key={i}>{line}</p>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
