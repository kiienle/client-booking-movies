import React, { Component } from "react";
import { connect } from "react-redux";

import "./button.scss";

class Button extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { className, onClick, children } = this.props;
        return (
            <button
                className={`movie-btn ${className}`}
                onClick={onClick ? () => onClick() : null}
            >
                {children}
            </button>
        );
    }
}

export class OutlineButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, onClick, children } = this.props;
        return (
            <Button
                className={`btn-outline ${className}`}
                onClick={onClick ? () => onClick() : null}
            >
                {children}
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
