import React, { Component } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

import "./MovieCard.scss";

class MovieCard extends Component {
    render() {
        const { item } = this.props;
        const link = `/movie/${item.id}`;
        let posterBase64;
        if (item.poster && item.poster && item.release_date) {
            posterBase64 = new Buffer(item.poster, "base64").toString("binary");
        }
        return (
            <Link to={link}>
                <div
                    className="movie-card"
                    style={{ backgroundImage: `url(${posterBase64})` }}
                >
                    <Button>Book Now</Button>
                </div>
                <p className="movie-title">{item.title || item.name}</p>
            </Link>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
