import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import showtimeService from "../../../services/showtimeService";
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
            cinemaList: "",
        };
    }
    componentDidMount() {
        this.props.getAllMovies();
        this.props.getAllCineplexs();
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

    handleChangeCineplex = (e, item) => {
        let id = e.target.value;
        this.setState({
            cineplex_id: id,
        });
        console.log(item);
    };

    handleAddNewShowtime = () => {
        this.checkValidInput();
        this.props.handleCreateNewShowtimeService(this.state);
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
        console.log(this.props);
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
                                    {cineplexList &&
                                        cineplexList.length > 0 &&
                                        cineplexList.map((item) => {
                                            return (
                                                <select
                                                    className="form-input"
                                                    style={{
                                                        width: 432 + "px",
                                                    }}
                                                    name="cineplex"
                                                    value={
                                                        this.state.cineplex_id
                                                    }
                                                    onChange={(e) =>
                                                        this.handleChangeCineplex(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value=""
                                                        selected="selected"
                                                        hidden="hidden"
                                                    >
                                                        Choose cineplex
                                                    </option>
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                </select>
                                            );
                                        })}
                                    <label className="form-label">
                                        Cineplex
                                    </label>
                                </div>

                                {/* <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="Showtime type"
                                        value={this.state.Showtime_type}
                                        onChange={(e) =>
                                            this.setState({
                                                Showtime_type: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose type
                                        </option>
                                        {cineType &&
                                            cineType.length > 0 &&
                                            cineType.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.keyMap}
                                                    >
                                                        {item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <label className="form-label">Type</label>
                                </div> */}

                                {/* <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.name}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">Name</label>
                                </div> */}

                                {/* <div className="input-container">
                                    <input
                                        placeholder=" "
                                        min="1"
                                        className="form-input"
                                        value={this.state.googleMapsUrl}
                                        type="number"
                                        onChange={(e) =>
                                            this.setState({
                                                horizontal_size: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Horizontal size
                                    </label>
                                </div>
                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        min="1"
                                        className="form-input"
                                        value={this.state.googleMapsUrl}
                                        type="number"
                                        onChange={(e) =>
                                            this.setState({
                                                vertical_size: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Vertical size
                                    </label>
                                </div>
                                <div className="input-container">
                                    <p className="text-center my-0">Monitor</p>
                                    <img
                                        src={MonitorImage}
                                        style={{ width: 432 + "px" }}
                                    />

                                    {horizontal_size && vertical_size && (
                                        <div className="mt-4 text-center">
                                            <span>{horizontal_size}</span>
                                            <i class="fas fa-couch mx-3 text-success"></i>
                                            <i class="fas fa-times"></i>
                                            <i class="fas fa-couch mx-3 text-success"></i>
                                            <span>{vertical_size}</span>
                                        </div>
                                    )}
                                </div> */}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => dispatch(actions.fetchAllMoviesStart()),
        getAllCineplexs: () => dispatch(actions.fetchAllCineplexStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowtime);
