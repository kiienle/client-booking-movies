import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import movieService from "../../services/movieService";

import "./MovieDetail.scss";
import MovieList from "./MovieList";
import { OutlineButton } from "../Button/Button";
import Booking from "../Booking/Booking";

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetail: {},
        };
    }

    async componentDidMount() {
        await this.handleGetMovieById(this.props.match.params.id);
    }

    handleGetMovieById = async (id) => {
        let response = await movieService.getMoviesById(id);
        if (response && response.errCode === 0) {
            this.setState({
                movieDetail: response.data,
            });
        }
    };
    render() {
        const { movieDetail } = this.state;
        console.log(movieDetail);
        let backgroundBase64;
        let posterBase64;
        let releaseDate;
        if (
            movieDetail.background &&
            movieDetail.poster &&
            movieDetail.release_date
        ) {
            backgroundBase64 = new Buffer(
                movieDetail.background,
                "base64"
            ).toString("binary");
            posterBase64 = new Buffer(movieDetail.poster, "base64").toString(
                "binary"
            );
            releaseDate = moment
                .unix(movieDetail.release_date / 1000)
                .format("DD-MM-YYYY");
        }
        return (
            <>
                {movieDetail && (
                    <>
                        <div
                            className="banner"
                            style={{
                                backgroundImage: `url(${backgroundBase64})`,
                            }}
                        ></div>
                        <div className="movie-container">
                            <div className="movie-content">
                                <div className="movie-content__poster">
                                    <div
                                        className="movie-content__poster__img"
                                        style={{
                                            backgroundImage: `url(${posterBase64})`,
                                        }}
                                    ></div>
                                </div>
                                <div className="movie-content__info">
                                    <h1 className="title">
                                        {movieDetail.title || movieDetail.name}
                                    </h1>
                                    <div className="genres">
                                        <span className="genres__item">
                                            {movieDetail.genre}
                                        </span>
                                        <span>{movieDetail.running_time}</span>
                                    </div>
                                    <p className="overview">
                                        {movieDetail.description}
                                    </p>
                                    <div className="section_header">
                                        Directors:
                                        <span>{movieDetail.director}</span>
                                    </div>
                                    <div className="section_header">
                                        Actor:
                                        <span>{movieDetail.actor}</span>
                                    </div>
                                </div>
                            </div>
                            <Booking movieDetail={movieDetail} />
                        </div>

                        <div className="movie-container">
                            {/* <div className="section mb-3">
                                <VideoList id={movieDetail.id} />
                            </div> */}
                            <div className="movie-list section mb-5">
                                <div className="section__header mb-2">
                                    <h2>Release Movie</h2>
                                    <Link to="/movie">
                                        <OutlineButton classNames="small">
                                            View more
                                        </OutlineButton>
                                    </Link>
                                </div>
                                <MovieList state="STATE3" />
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
