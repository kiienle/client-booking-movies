import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import moment from "moment";
import DataTable from "react-data-table-component";
import showtimeService from "../../../services/showtimeService";
import ModalShowtime from "../Modal/ModalShowtime.js";
import ModalEditShowtime from "../Modal/ModalEditShowtime";
import "./ShowtimeManage.scss";

const columns = [
    {
        name: "ID",
        selector: (row) => row.id,
        width: "50px",
    },
    {
        name: "Movie",
        selector: (row) => row.Movie.title,
        width: "256px",
    },
    {
        name: "Cineplex",
        selector: (row) => row.Cinema.Cineplex.name,
        // width: "120px",
    },
    {
        name: "Cinema",
        selector: (row) => row.Cinema.name,
        // width: "256px",
    },
    {
        name: "Date",
        selector: (row) => moment.unix(row.date / 1000).format("DD-MM-YYYY"),
        // width: "256px",
    },
    {
        name: "Time",
        selector: (row) => row.timeData.valueVi,
        // width: "256px",
    },
    {
        name: "Price",
        selector: (row) => row.priceData.valueVi,
        // width: "256px",
    },
];

class ShowtimeManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrShowtimes: [],
            isOpenModalShowtime: false,
            isOpenEditMode: false,
            ShowtimeEditData: {},
        };
    }

    async componentDidMount() {
        await this.getAllShowtimesFromReact();
    }

    getAllShowtimesFromReact = async () => {
        await this.props.getAllShowtimes();
        if (this.props.showtimeList && this.props.showtimeList.length > 0) {
            this.setState({
                arrShowtimes: this.props.showtimeList,
            });
        }
    };

    handleAddNewShowtime = () => {
        this.setState({
            isOpenModalShowtime: true,
        });
    };

    handleHideModalShowtime = () => {
        this.setState({
            isOpenModalShowtime: !this.state.isOpenModalShowtime,
        });
    };

    handleCreateNewShowtimeService = async (showtimeData) => {
        try {
            let response = await showtimeService.createNewShowtime(
                showtimeData
            );
            console.log(response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllShowtimesFromReact();
                this.setState({
                    isOpenModalShowtime: !this.state.isOpenModalShowtime,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    // handleDeleteShowtime = async (id) => {
    //     console.log(id);
    //     try {
    //         let response = await ShowtimeService.deleteShowtimeById(id);
    //         if (response && response.errCode === 0) {
    //             await this.getAllShowtimesFromReact();
    //         } else {
    //             alert(response.errMessage);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    handleUpdateShowtime = async (data) => {
        console.log(data);
        try {
            let res = await showtimeService.updateShowtimeById(data);
            console.log(res);
            if (res && res.errCode === 0) {
                await this.getAllShowtimesFromReact();
                this.setState({
                    isOpenEditMode: !this.state.isOpenEditMode,
                });
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleOnRowClick = (data) => {
        console.log({ ...data });
        this.setState({
            isOpenEditMode: true,
            ShowtimeEditData: { ...data },
        });
    };

    render() {
        const { arrShowtimes } = this.state;
        console.log(arrShowtimes);
        return (
            <div className="showtime-manage">
                {this.state.isOpenModalShowtime && (
                    <ModalShowtime
                        isOpen={this.state.isOpenModalShowtime}
                        handleHideModalShowtime={this.handleHideModalShowtime}
                        handleCreateNewShowtimeService={
                            this.handleCreateNewShowtimeService
                        }
                    />
                )}
                {this.state.isOpenEditMode && (
                    <ModalEditShowtime
                        isOpen={this.state.isOpenEditMode}
                        hideModalEidt={() =>
                            this.setState({
                                isOpenEditMode: !this.state.isOpenEditMode,
                            })
                        }
                        currentShowtime={this.state.ShowtimeEditData}
                        handleUpdateShowtime={this.handleUpdateShowtime}
                    />
                )}

                <div>
                    <button
                        onClick={() => this.handleAddNewShowtime()}
                        type="button"
                        class="btn btn-primary px-2 mb-3"
                    >
                        <i class="fas fa-plus mx-2"></i>
                        Add new Showtime
                    </button>
                </div>
                <div className="showtime-table">
                    <DataTable
                        title="List Showtimes"
                        columns={columns}
                        data={arrShowtimes}
                        theme="solarized"
                        pagination
                        highlightOnHover
                        pointerOnHover
                        // handleEditUser={this.handleEditUser}
                        onRowClicked={this.handleOnRowClick}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showtimeList: state.showtime.showtimeList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllShowtimes: () => dispatch(actions.fetchAllShowtimeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeManage);
