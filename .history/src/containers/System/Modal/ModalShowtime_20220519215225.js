import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import { allCodeService } from "../../../services";
import MonitorImage from "../../../assets/images/monitor.png";
import "./Modal.scss";

class ModalShowtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.props.getAllMovies();
        this.props.getAllCineplexs();
        this.getShowtimeListAllcode();
        this.getPriceListAllcode();
    }

    toggle = () => {
        this.props.handleHideModalShowtime();
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
        let response = await cinemaService.getAllcode("TIME");
        if (response && response.data && response.errCode === 0) {
            this.setState({
                showtimeList: response.data,
            });
        }
    };

    getPriceListAllcode = async () => {
        let response = await allCodeService.getAllcode("PRICE");
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
            date: Date.parse(date[0]),
        });
    };

    handleAddNewShowtime = () => {
        let valid = this.checkValidInput();
        if (valid === true) {
            this.props.handleCreateNewShowtimeService(this.state);
        }
        if (this.props.isOpen === false) {
            this.setState({
                movie_id: "",
                cinema_id: "",
                cineplex_id: "",
                show_time: "",
                date: "",
                price: "",
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
                        onClick={() => this.handleAddNewShowtime()}
                    >
                        Add Cineplex
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowtime);
