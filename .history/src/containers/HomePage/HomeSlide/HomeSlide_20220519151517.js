import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "./HomeSlide.scss";

class HomeSlide extends Component {
    render() {
        return <div>hello</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        movieList: state.movie.movieList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovie: () => dispatch(actions.fetchAllMoviesStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlide);
