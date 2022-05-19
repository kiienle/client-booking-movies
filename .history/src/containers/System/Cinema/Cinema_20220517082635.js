import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import moment from "moment";
import DataTable from "react-data-table-component";
import cinemaService from "../../../services/cinemaService";
import ModalCinema from "../Modal/ModalCinema.js";
import ModalEditCinema from "../Modal/ModalEditCinema";
import "./Cinema.scss";

const columns = [
    {
        name: "ID",
        selector: (row) => row.id,
        width: "50px",
    },
    {
        name: "Cinema",
        selector: (row) => row.name,
        width: "152px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        hide: false,
        // width: "256px",
    },
    {
        name: "Cineplex",
        selector: (row) => row.Cineplex.name,
        // width: "120px",
    },
];

class Cinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCinemas: [],
            isOpenModalCinema: false,
            isOpenEditMode: false,
            CinemaEditData: {},
        };
    }

    async componentDidMount() {
        await this.getAllCinemasFromReact();
    }

    getAllCinemasFromReact = async () => {
        await this.props.getAllCinemas();
        if (this.props.CinemaList && this.props.CinemaList.length > 0) {
            this.setState({
                arrCinemas: this.props.CinemaList,
            });
        }
    };

    handleAddNewCinema = () => {
        this.setState({
            isOpenModalCinema: true,
        });
    };

    handleHideModalCinema = () => {
        this.setState({
            isOpenModalCinema: !this.state.isOpenModalCinema,
        });
    };

    handleCreateNewCinemaService = async (cinemaData) => {
        try {
            let response = await cinemaService.createNewCinema(cinemaData);
            console.log(response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllCinemasFromReact();
                this.setState({
                    isOpenModalCinema: !this.state.isOpenModalCinema,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    // handleDeleteCinema = async (id) => {
    //     console.log(id);
    //     try {
    //         let response = await CinemaService.deleteCinemaById(id);
    //         if (response && response.errCode === 0) {
    //             await this.getAllCinemasFromReact();
    //         } else {
    //             alert(response.errMessage);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    handleUpdateCinema = async (data) => {
        console.log(data);
        try {
            let res = await cinemaService.updateCinemaById(data);
            console.log(res);
            if (res && res.errCode === 0) {
                await this.getAllCinemasFromReact();
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
        console.log(data);
        this.setState({
            isOpenEditMode: true,
            CinemaEditData: { ...data },
        });
    };

    render() {
        console.log(this.props.cinemaList);
        const { arrCinemas } = this.state;
        return (
            <div className="cinema-container">
                {this.state.isOpenModalCinema && (
                    <ModalCinema
                        isOpen={this.state.isOpenModalCinema}
                        handleHideModalCinema={this.handleHideModalCinema}
                        handleCreateNewCinemaService={
                            this.handleCreateNewCinemaService
                        }
                    />
                )}
                {this.state.isOpenEditMode && (
                    <ModalEditCinema
                        isOpen={this.state.isOpenEditMode}
                        hideModalEidt={() =>
                            this.setState({
                                isOpenEditMode: !this.state.isOpenEditMode,
                            })
                        }
                        currentCinema={this.state.CinemaEditData}
                        handleUpdateCinema={this.handleUpdateCinema}
                    />
                )}

                <div>
                    <button
                        onClick={() => this.handleAddNewCinema()}
                        type="button"
                        class="btn btn-primary px-2 mb-3"
                    >
                        <i class="fas fa-plus mx-2"></i>
                        Add new Cinema
                    </button>
                </div>
                <div className="cinema-table">
                    <DataTable
                        title="List Cinemas"
                        columns={columns}
                        data={arrCinemas}
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
        cinemaList: state.cinema.cinemaList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCinemas: () => dispatch(actions.fetchAllCinemaStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
