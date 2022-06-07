import React, { Component } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import MovieCard from "./MovieCard";

import "./MovieList.scss";

class MovieList extends Component {
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
        await this.props.getMoviesByState(this.props.state);
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
        const { moviesByState } = this.state;
        return (
            <div className="movie-list">
                <Swiper
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                >
                    {moviesByState.map((item, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                            <MovieCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
