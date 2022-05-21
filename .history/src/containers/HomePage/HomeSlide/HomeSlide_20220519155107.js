import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "./HomeSlide.scss";

class HomeSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
        };
    }

    async componentDidMount() {
        await this.handleGetAllMovies();
    }

    handleGetAllMovies = async () => {
        await this.props.getAllMovies();
        if (this.props.movieList && this.props.movieList.length > 0) {
            let copyState = { ...this.state };
            copyState.movieList = this.props.movieList;
            this.setState({
                ...copyState,
            });
        }
    };
    render() {
        SwiperCore.use([Autoplay]);
        console.log(this.state.movieList);
        return <div>hello</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        movieList: state.movie.movieList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => dispatch(actions.fetchAllMoviesStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlide);
