import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import HomeSlide from "./HomeSlide/HomeSlide";
import HomeHeader from "../Header/HomeHeader";
import MovieList from "../Movie/MovieList";

import "./HomePage.scss";
import { OutlineButton } from "../Button/Button";

class HomePage extends Component {
    render() {
        return (
            <>
                <HomeSlide />
                <div className="movie-container">
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Showing Movies</h2>
                            <Link to="/movie">
                                <OutlineButton classNames="small">
                                    View more
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList state="STATE3" />
                    </div>
                    <div className="section mb-5">
                        <div className="section__header mb-2">
                            <h2>Upcoming Movies</h2>
                            <Link to="/movie">
                                <OutlineButton classNames="small">
                                    View more
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList state="STATE1" />
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
