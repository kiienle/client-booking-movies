import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

import "./HomeSlide.scss";

class HomeSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesByState: [],
        };
    }

    async componentDidMount() {
        await this.handleGetMoviesByState();
    }

    handleGetMoviesByState = async () => {
        await this.props.getMoviesByState("STATE3");
        if (this.props.moviesByState && this.props.moviesByState.length > 0) {
            let movieList = this.props.moviesByState;
            // sort array movie
            movieList.sort(function (a, b) {
                return b.id - a.id;
            });
            this.setState({
                moviesByState: movieList.slice(0, 7),
            });
        }
    };
    render() {
        SwiperCore.use([Autoplay]);
        const { moviesByState } = this.state;
        console.log(moviesByState);
        return (
            <div className="home-slide">
                <Swiper
                    modules={[Autoplay]}
                    grabCursor={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 6000 }}
                >
                    {moviesByState &&
                        moviesByState.length &&
                        moviesByState.map((item, i) => (
                            <SwiperSlide key={i}>
                                {({ isActive }) => (
                                    <HomeSlideItem
                                        item={item}
                                        className={`${
                                            isActive ? "active" : ""
                                        }`}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        );
    }
}

class HomeSlideItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, className } = this.props;
        let backgroundBase64;
        let posterBase64;
        let releaseDate;
        if (item.background && item.poster && item.release_date) {
            backgroundBase64 = new Buffer(item.background, "base64").toString(
                "binary"
            );
            posterBase64 = new Buffer(item.poster, "base64").toString("binary");
            releaseDate = moment
                .unix(item.release_date / 1000)
                .format("DD-MM-YYYY");
        }
        return (
            <div
                className={`home-slide__item ${className}`}
                style={{ backgroundImage: `url(${backgroundBase64})` }}
            >
                <div className="home-slide__item__content home-container">
                    <div className="home-slide__item__content__info">
                        <p className="title">{item.title}</p>
                        <div className="overview">{item.description}</div>
                        <div className="release-date">{releaseDate}</div>
                        <div className="btns">
                            {/* <Button
                                onClick={() =>
                                    hisrory.push("/movie/" + item.id)
                                }
                            >
                                Watch now
                            </Button> */}
                            {/* <OutlineButton onClick={setModalActive}>
                                Watch trailer
                            </OutlineButton> */}
                        </div>
                    </div>
                    <div className="home-slide__item__content__poster">
                        <img src={posterBase64} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        moviesByState: state.movie.moviesByState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMoviesByState: (state) =>
            dispatch(actions.fetchMoviesByStateStart(state)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlide);
