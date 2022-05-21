import _ from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import { allCodeService } from "../../../services";
import "./Modal.scss";

class ModalEditShowtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            movie_id: "",
            cinema_id: "",
            cineplex_id: "",
            show_time: "",
            date: "",
            price: "",
            cinemaList: [],
            showtimeList: [],
            priceList: [],
        };
    }
    componentDidMount() {
        let showtime = this.props.currentShowtime;

        this.props.getAllMovies();
        this.props.getAllCineplexs();
        this.getShowtimeListAllcode();
        this.getPriceListAllcode();
        this.handelGetCinemaByCineplexId(showtime.cineplex_id);
        console.log(showtime);
        let showtimeDate;
        if (showtime && !_.isEmpty(showtime)) {
            showtimeDate = moment
                .unix(showtime.date / 1000)
                .format("DD-MM-YYYY");

            this.setState({
                id: showtime.id,
                movie_id: showtime.movie_id,
                cinema_id: showtime.cinema_id,
                cineplex_id: showtime.cineplex_id,
                show_time: showtime.show_time,
                date: showtimeDate,
                price: showtime.price,
            });
        }
    }

    toggle = () => {
        this.props.hideModalEdit();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "movie_id",
            "cinema_id",
            "cineplex_id",
            "show_time",
            "date",
            "price",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parametor: ${arrInput[i]}`);
                break;
            }
            return isValid;
        }
    };

    getShowtimeListAllcode = async () => {
        let response = await allCodeService.getAllCode("TIME");
        if (response && response.data && response.errCode === 0) {
            this.setState({
                showtimeList: response.data,
            });
        }
    };

    getPriceListAllcode = async () => {
        let response = await allCodeService.getAllCode("PRICE");
        if (response && response.data && response.errCode === 0) {
            this.setState({
                priceList: response.data,
            });
        }
    };

    handleChangeCineplex = async (e) => {
        let id = e.target.value;
        this.setState({
            cineplex_id: id,
        });
        await this.handelGetCinemaByCineplexId(id);
    };

    handelGetCinemaByCineplexId = async (id) => {
        await this.props.getCinemaById(id);
        this.setState({
            cinemaList: this.props.cinemaList,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            date: parseInt(Date.parse(date[0])),
        });
    };

    handleUpdateShowTime = () => {
        let valid = this.checkValidInput();
        const copyState = this.state;
        let showtimeDate = copyState.date;

        // so sanh kieu du lieu
        if (typeof showtimeDate !== "number") {
            // (string !== number)
            showtimeDate = showtimeDate.split("-");
            let convertDateToTimestemp = new Date(
                showtimeDate[2],
                showtimeDate[1] - 1,
                showtimeDate[0]
            ).getTime();
            copyState.date = convertDateToTimestemp;
        }
        if (valid) {
            this.props.handleUpdateShowtime(copyState);
        }
        if (this.props.isOpen === false) {
            this.setState({
                poster: "",
                title: "",
                description: "",
                director: "",
                actor: "",
                genre: "",
                trailer: "",
                release_date: "",
                running_time: "",
                state: "",
                active: "",
                background: "",
                posterName: "",
            });
        }
    };

    componentWillUnmount() {
        this.setState({
            movie_id: "",
            cinema_id: "",
            cineplex_id: "",
            show_time: "",
            date: "",
            price: "",
        });
    }
    render() {
        const { cineplexList, movieList } = this.props;
        const { cinemaList, showtimeList, priceList } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-container"}
                size="ms"
            >
                <ModalHeader
                    className="form-title"
                    toggle={() => this.toggle()}
                >
                    Create a new show time
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-content_">
                            <div className="modal-input">
                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="movie"
                                        value={this.state.movie_id}
                                        onChange={(e) =>
                                            this.setState({
                                                movie_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose movie
                                        </option>
                                        {movieList &&
                                            movieList.length > 0 &&
                                            movieList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.title}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <label className="form-label">Movie</label>
                                </div>

                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{
                                            width: 432 + "px",
                                        }}
                                        name="cineplex"
                                        value={this.state.cineplex_id}
                                        onChange={(e) =>
                                            this.handleChangeCineplex(e)
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose cineplex
                                        </option>
                                        {cineplexList &&
                                            cineplexList.length > 0 &&
                                            cineplexList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <label className="form-label">
                                        Cineplex
                                    </label>
                                </div>

                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="Cinema"
                                        value={this.state.cinema_id}
                                        onChange={(e) =>
                                            this.setState({
                                                cinema_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose cinema
                                        </option>
                                        {cinemaList &&
                                            cinemaList.length > 0 &&
                                            cinemaList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <label className="form-label">Cinema</label>
                                </div>

                                <div className="input-container">
                                    <DatePicker
                                        className="form-input"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.date}
                                        minDate={moment(new Date())
                                            .subtract(1, "days")
                                            .toDate()}
                                    />
                                    <label className="form-label">
                                        Release Date
                                    </label>
                                </div>

                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="Show time"
                                        value={this.state.show_time}
                                        onChange={(e) =>
                                            this.setState({
                                                show_time: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose time
                                        </option>
                                        {showtimeList &&
                                            showtimeList.length > 0 &&
                                            showtimeList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.keyMap}
                                                    >
                                                        {item.valueVi}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <label className="form-label">Time</label>
                                </div>

                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="Price"
                                        value={this.state.price}
                                        onChange={(e) =>
                                            this.setState({
                                                price: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose price
                                        </option>
                                        {priceList &&
                                            priceList.length > 0 &&
                                            priceList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.keyMap}
                                                    >
                                                        {item.valueVi
                                                            .toString()
                                                            .replace(
                                                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                                                "."
                                                            )}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <label className="form-label">Price</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleUpdateShowTime()}
                    >
                        Update Showtime
                    </Button>
                    <Button color="danger px-2" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieList: state.movie.movieList,
        cineplexList: state.cineplex.cineplexList,
        cinemaList: state.cinema.cinemaListById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => dispatch(actions.fetchAllMoviesStart()),
        getAllCineplexs: () => dispatch(actions.fetchAllCineplexStart()),
        getCinemaById: (id) => dispatch(actions.fetchCinemaByIdStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditShowtime);
