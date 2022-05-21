import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import HomeSideBar from "./HomeSideBar";

import "./HomeSlide.scss";
import "swiper/css";

class HomeSlide extends Component {
    render() {
        return (
            <div>
                <HomeSideBar isShowBanner={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlide);
