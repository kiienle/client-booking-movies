import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./SideBar.scss";

class SideBar extends Component {
    render() {
        const { processLogout } = this.props;

        return (
            <div className="SideBar-container">
                <div className="SideBar-logo"></div>
                {/* thanh navigator */}
                <div className="SideBar-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="profile">
                    <div className="btn btn-logout " onClick={processLogout}>
                        log out
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
