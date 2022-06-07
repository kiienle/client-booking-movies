import React, { Component } from "react";
import { connect } from "react-redux";
import "./modal.scss";

class Modal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={props.id} className={`modal ${active ? "active" : ""}`}>
                {props.children}
            </div>
        );
    }
}

export class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }

    closeModal = () => {
        this.contentRef.current.parentNode.classList.remove("active");
        if (props.onClose) props.onClose();
    };

    render() {
        return (
            <div ref={this.contentRef} className="modal__content">
                {props.children}
                <div className="modal__content__close" onClick={closeModal}>
                    <div className="bx bx-x"></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // isLoggedIn: state.admin.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
