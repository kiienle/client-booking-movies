import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import MovieCard from "./MovieCard";

import "./MovieGrid.scss";
import HomeSlide from "../HomePage/HomeSlide/HomeSlide";

class MovieGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesByState: [],
            movieState: "",
        };
    }

    componentDidMount() {
        this.handleGetMoviesByState("STATE3");
    }

    handleGetMoviesByState = async (state) => {
        this.setState({
            movieState: state,
        });
        await this.props.getMoviesByState(state);
        if (this.props.moviesByState) {
            let movieList = this.props.moviesByState;
            movieList
                .sort(function (a, b) {
                    return b.id - a.id;
                })
                .slice(0, 7);
            this.setState({
                moviesByState: movieList,
            });
        }
    };

    render() {
        const { moviesByState, movieState } = this.state;
        console.log(this.props.history);
        return (
            <>
                <HomeSlide />
                <div className="movie-container">
                    <div className="section mb-3 mt-5">
                        <ul className="movie-tabs">
                            <li
                                className={
                                    movieState === "STATE3" ? "active" : ""
                                }
                                onClick={() =>
                                    this.handleGetMoviesByState("STATE3")
                                }
                            >
                                <p>Showing Movies</p>
                            </li>
                            <li
                                className={
                                    movieState === "STATE1"
                                        ? "active mx-4"
                                        : "mx-4"
                                }
                                onClick={() =>
                                    this.handleGetMoviesByState("STATE1")
                                }
                            >
                                <p>Upcoming Movies</p>
                            </li>
                        </ul>
                        <div className="movie-grid">
                            {moviesByState.map((item, i) => (
                                <MovieCard key={i} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MovieGrid)
);
