import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import HomeSlide from "./HomeSlide/HomeSlide";
import HomeHeader from "../Header/HomeHeader";
import MovieList from "./MovieList/MovieList";

import "./HomePage.scss";

class HomePage extends Component {
    render() {
        return (
            <>
                <HomeHeader />
                <HomeSlide />
                <div className="container">
                    {/* <div className="section mb-3">
                        <div className="input-container">
                            <input
                                placeholder=" "
                                className="form-input"
                                // value={this.state.name}
                                type="text"
                                // onChange={(e) =>
                                //     this.setState({
                                //         name: e.target.value,
                                //     })
                                // }
                            />
                            <label className="form-label">Name</label>
                        </div>
                    </div> */}
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Showing Movies</h2>
                            <Link to="/movie">
                                {/* <OutlineButton classNames="small">
                                    View more
                                </OutlineButton> */}
                            </Link>
                        </div>
                        <MovieList state="STATE3" />
                    </div>
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Upcoming Movies</h2>
                            <Link to="/movie">
                                {/* <OutlineButton classNames="small">
                                    View more
                                </OutlineButton> */}
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
