import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SwiperCore, { Autoplay } from "swiper";

import "./HomeSlide.scss";
import Button, { OutlineButton } from "../../Button/Button";

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
        const { history } = this.props;

        return (
            <div className="home-slide">
                <Swiper
                    modules={[Autoplay]}
                    grabCursor={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 6000 }}
                >
                    {moviesByState.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HomeSlideItem
                                    history={history}
                                    item={item}
                                    className={`${isActive ? "active" : ""}`}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {moviesByState.map((item, i) => (
                    <TrailerModal key={i} item={item} />
                ))}
            </div>
        );
    }
}

class HomeSlideItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, className, history } = this.props;
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
                <div className="home-slide__item__content movie-container">
                    <div className="home-slide__item__content__poster">
                        <img src={posterBase64} alt="" />
                    </div>
                    <div className="home-slide__item__content__info">
                        <p className="title">{item.title}</p>
                        <div className="state">{item.stateData.valueEn}</div>
                        <div className="release-date">{releaseDate}</div>
                        <div className="btns">
                            <Button
                                onClick={() =>
                                    history.push("/movie/" + item.id)
                                }
                            >
                                Booking now
                            </Button>
                            <OutlineButton>Watch trailer</OutlineButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TrailerModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div></div>
            // <Modal active={false} id={`modal_${item.id}`}>
            //     <ModalBody onClose={onClose}>
            //         <iframe
            //             ref={iframeRef}
            //             width="100%"
            //             height="500px"
            //             title="trailer"
            //         ></iframe>
            //     </ModalBody>
            // </Modal>
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
    connect(mapStateToProps, mapDispatchToProps)(HomeSlide)
);
