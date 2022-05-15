import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ShowtimeManage.scss";

class ShowtimeManage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="showtime-manage">
                register package group or account
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeManage);
