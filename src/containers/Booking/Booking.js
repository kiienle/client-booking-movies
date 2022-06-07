import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import { LANGUAGES } from "../../utils";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment";
import { showtimeService } from "../../services";

import "react-tabs/style/react-tabs.css";
import "./Booking.scss";

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cineplexList: [],
            allDays: [],
            availiableTime: [],
            activeCineplex: false,
            activeCinema: false,
            selectedDate: "",
            selectedTime: "",
            selectedCineplexId: "",
            selectedCinemaId: "",
            cinemaLabel: "Cinema",
            cineplexLabel: "Cineplex",
        };
        this.inputCineplex = React.createRef();
        this.inputCinema = React.createRef();
    }

    async componentDidMount() {
        this.props.getAllCineplexs();
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    getArrDays = () => {
        let { language } = this.props;
        let arrDays = [];
        for (let i = 0; i < 4; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let DDMM = moment(new Date()).format("DD/MM");
                    let today = `Hôm nay - ${DDMM}`;
                    object.label = this.capitalizeFirstLetter(today);
                } else {
                    let labelVi = moment(new Date())
                        .add(i, "days")
                        .format("dddd - DD/MM");
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let DDMM = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("DD/MM");
                    let today = `Today - ${DDMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("ddd - DD/MM");
                }
            }
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("days")
                .valueOf();

            arrDays.push(object);
        }

        return arrDays;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays();
            this.setState({
                allDays,
            });
        }
    }

    // handleChangeDateSelect = async (date) => {
    //     if (this.props.doctorId && this.props.doctorId !== -1) {
    //         let doctorId = this.props.doctorId;
    //         let res = await getScheduleDoctorByDate(doctorId, date);
    //         if (res && res.errCode === 0) {
    //             this.setState({
    //                 allAvailableTime: res.dataSchedule ? res.dataSchedule : [],
    //             });
    //         }
    //     }
    // };

    handleShowCineplexSelect = () => {
        const inputRef = this.inputCineplex.current;
        inputRef.focus();
        let allDays = this.getArrDays();
        if (allDays && allDays.length > 0) {
            // let res = await getScheduleDoctorByDate(
            //     this.props.doctorId,
            //     allDays[0].value
            // );
            this.setState({
                allDays,
                selectedDate: allDays[0].value,
                // allAvailableTime: res.dataSchedule ? res.dataSchedule : [],
            });
        }
        this.setState({
            activeCineplex: true,
        });
    };

    handleGetAvailiableTime = async () => {
        const { selectedCinemaId, selectedCineplexId, selectedDate } =
            this.state;
        const movieId = this.props.movieDetail.id;
        console.log(movieId);
        let timeData = await showtimeService.getShowtimeByDate(
            selectedCinemaId,
            selectedCineplexId,
            selectedDate,
            movieId
        );
        console.log(timeData);
        if (timeData && timeData.errCode === 0) {
            this.setState({
                availiableTime: timeData.res,
            });
        }
    };

    handleShowCinemaSelect = () => {
        const inputRef = this.inputCinema.current;
        inputRef.focus();

        this.setState({
            activeCinema: true,
        });
    };

    handleHideCineplexSelect = () => {
        this.setState({
            activeCineplex: false,
        });
    };
    handleHideCinemaSelect = () => {
        this.setState({
            activeCinema: false,
        });
    };

    handleSelectCineplexOption = async (item) => {
        const { selectedCineplexId, cineplexLabel } = this.state;
        if (item.id === selectedCineplexId) {
            this.setState({
                selectedCineplexId: "",
                cineplexLabel: "Cineplex",
            });
            this.handleHideCinemaSelect();
        } else {
            this.setState({
                selectedCineplexId: item.id,
                cineplexLabel: item.name,
            });
        }
        await this.props.getCinemaById(item.id);
        this.handleHideCineplexSelect();
        this.handleSelectCinemaOption(item.Cinemas[0]);
        this.handleGetAvailiableTime();
    };

    handleSelectCinemaOption = async (item) => {
        const { selectedCinemaId, cinemaLabel } = this.state;
        if (item.id === selectedCinemaId) {
            this.setState({
                selectedCinemaId: "",
                cinemaLabel: "Cinema",
            });
        } else {
            this.setState({
                selectedCinemaId: item.id,
                cinemaLabel: `${item.name} - ${item.typeData.valueEn}`,
            });
        }
        this.handleHideCinemaSelect();
    };

    handleselectedDate = (item) => {
        this.setState({
            selectedDate: item.value,
        });

        this.handleGetAvailiableTime();
    };

    handleSelectedTime = () => {};
    render() {
        const { cineplexList, cinemaList } = this.props;
        const {
            activeCineplex,
            activeCinema,
            selectedCineplexId,
            cineplexLabel,
            selectedCinemaId,
            cinemaLabel,
            allDays,
            selectedDate,
            availiableTime,
        } = this.state;
        console.log(availiableTime);
        return (
            <>
                <div className="booking-content">
                    <div className="booking-content__title">
                        Start your booking
                    </div>
                    <div className="booking-content__detail">
                        <div className="layout">
                            <div className="item">
                                <div className="select-title">
                                    Choose a Cinema
                                </div>
                            </div>
                            <div className="item">
                                {selectedCineplexId && (
                                    <div className="select-title">
                                        Choose a Cinema Type
                                    </div>
                                )}
                            </div>
                            <div className="item">
                                <div className="location-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="cinema-select form-group">
                                    <div
                                        className={
                                            activeCineplex
                                                ? "multi-select active"
                                                : "multi-select"
                                        }
                                    >
                                        <input
                                            name="inputRef"
                                            ref={this.inputCineplex}
                                            onFocus={() =>
                                                this.handleShowCineplexSelect()
                                            }
                                            // onBlur={() =>
                                            //     this.handleHideCineSelect()
                                            // }
                                            className="multi-select_input"
                                            type="text"
                                        />
                                        <span className="multi-select_label">
                                            {cineplexLabel}
                                        </span>
                                        <div
                                            className="multi-select_arrow"
                                            onClick={() =>
                                                this.handleShowCineplexSelect()
                                            }
                                        >
                                            <i class="fas fa-caret-down"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                {selectedCineplexId && (
                                    <div className="cinema-select form-group">
                                        <div className="multi-select">
                                            <input
                                                name="inputRef"
                                                ref={this.inputCinema}
                                                onFocus={() =>
                                                    this.handleShowCinemaSelect()
                                                }
                                                className="multi-select_input"
                                                type="text"
                                            />
                                            <span className="multi-select_label">
                                                {cinemaLabel}
                                            </span>
                                            <div
                                                className="multi-select_arrow"
                                                onClick={() =>
                                                    this.handleShowCinemaSelect()
                                                }
                                            >
                                                <i class="fas fa-caret-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="item">
                                <div className="multi-select">
                                    <div
                                        className="mutil-select_wrapper"
                                        style={
                                            activeCineplex
                                                ? {}
                                                : { display: "none" }
                                        }
                                    >
                                        <ul className="mutil-select_content">
                                            {cineplexList.map((item) => {
                                                return (
                                                    <li
                                                        onClick={() =>
                                                            this.handleSelectCineplexOption(
                                                                item
                                                            )
                                                        }
                                                        className={
                                                            selectedCineplexId ===
                                                            item.id
                                                                ? "mutil-select_element selected"
                                                                : "mutil-select_element"
                                                        }
                                                    >
                                                        <span
                                                            value={item.id}
                                                            className="mutil-select_option"
                                                        >
                                                            {item.name}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="item">
                                <div className="multi-select-cinema">
                                    <div
                                        className="mutil-select_wrapper"
                                        style={
                                            activeCinema
                                                ? {}
                                                : { display: "none" }
                                        }
                                    >
                                        <ul className="mutil-select_content">
                                            {cinemaList.map((item) => {
                                                return (
                                                    <li
                                                        onClick={() =>
                                                            this.handleSelectCinemaOption(
                                                                item
                                                            )
                                                        }
                                                        className={
                                                            selectedCinemaId ===
                                                            item.id
                                                                ? "mutil-select_element selected"
                                                                : "mutil-select_element"
                                                        }
                                                    >
                                                        <span
                                                            value={item.id}
                                                            className="mutil-select_option"
                                                        >
                                                            {item.name}-
                                                            {
                                                                item.typeData
                                                                    .valueEn
                                                            }
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {selectedCineplexId && (
                            <div className="select-date-time">
                                <hr />
                                <div className="select-title">
                                    Choose a Date and Time
                                </div>
                                <div className="layout">
                                    {allDays.map((item) => {
                                        return (
                                            <div
                                                className={
                                                    selectedDate === item.value
                                                        ? "detail-movie_select-date active"
                                                        : "detail-movie_select-date"
                                                }
                                                onClick={() =>
                                                    this.handleselectedDate(
                                                        item
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="layout">
                                    <div className="detail-movie_select-time">
                                        {availiableTime.map((item) => {
                                            return (
                                                <div
                                                    className="select_option"
                                                    onClick={() =>
                                                        this.handleSelectedTime()
                                                    }
                                                >
                                                    <span className="select_option-label">
                                                        {item.timeData.valueEn}
                                                    </span>
                                                    <span className="select_option-label">
                                                        {item.Cinema.name}
                                                    </span>
                                                    <span className="select_option-label">
                                                        {
                                                            item.Cinema.typeData
                                                                .valueVi
                                                        }
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )}
                        <div className="detail_booking-ticket">
                            <button className="btn movie-booking">
                                <span className="btn-booking">
                                    Book Tickets
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        cineplexList: state.cineplex.cineplexList,
        cinemaList: state.cinema.cinemaListById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCineplexs: () => dispatch(actions.fetchAllCineplexStart()),
        getCinemaById: (id) => dispatch(actions.fetchCinemaByIdStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
