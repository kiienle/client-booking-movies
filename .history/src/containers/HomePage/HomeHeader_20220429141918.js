import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./HomeSideBar.scss";

class HomeSideBar extends Component {
    render() {
        return (
            <div className="home-SideBar-container">
                <div className="home-SideBar-content">
                    <div className="content-left">
                        <a className="logo"></a>
                    </div>
                    <div className="content-right"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSideBar);
