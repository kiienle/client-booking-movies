import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./AdminHeader.scss";

class AdminHeader extends Component {
    render() {
        return <div className="AdminHeader-container"></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
