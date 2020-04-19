import React, { Component } from "react";
import "./ReaderModal.css";

export default class ReaderModal extends Component {
    render() {
        let readerModal = this.props.readerModal;
        //adding hidden class to modal if it's not opened
        let modalClass =
            "reader-background " + (!readerModal.isOpened ? "hidden" : "");
        //Assign title and content only when the modal is opened to avoid undefined
        let title = readerModal.isOpened ? readerModal.title : "";
        let content = readerModal.isOpened ? readerModal.content : "";

        return (
            <div className="reader-container">
                <div
                    element="modal"
                    className={modalClass}
                    onClick={(e) => this.props.closeReaderModal(e)}
                >
                    <div className="post-reader">
                        <div className="reader-title">{title}</div>
                        <div className="reader-content">
                            {content.split("\n").map((line, i) => {
                                return <p key={i}>{line}</p>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
