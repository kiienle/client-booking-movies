import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./AdminHeader.scss";

class AdminHeader extends Component {
    render() {
        return (
            <div className="header-container">
                <div className="content-left">
                    <div className="logo">
                        <i class="fas fa-camera-movie"></i>BookingMovie
                    </div>
                    <div className="search"></div>
                </div>
                <div className="content-right">
                    <div className="toggle-language">
                        <i class="fas fa-globe"></i>
                        <div className="language-vi">
                            <span>Việt Nam</span>
                        </div>
                        <div className="language-en">
                            <span>English</span>
                        </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
