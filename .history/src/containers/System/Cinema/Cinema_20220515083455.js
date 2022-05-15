import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
// import moment from "moment";
import DataTable from "react-data-table-component";
import cineplexService from "../../../services/cineplexService";
import ModalCineplex from "../Modal/ModalCineplex.js";
// import ModalEditCineplex from "../Modal/ModalEditCineplex";
import "./Cinema.scss";

const columns = [
    {
        name: "ID",
        selector: (row) => row.id,
        width: "50px",
    },
    {
        name: "Cineplex",
        selector: (row) => {
            let imageBase64;
            if (row.image) {
                imageBase64 = new Buffer(row.image, "base64").toString(
                    "binary"
                );
            }
            return <img src={imageBase64} style={{ width: 120 }} />;
        },
        width: "152px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        hide: false,
        // width: "256px",
    },
    {
        name: "Address",
        selector: (row) => row.address,
        // width: "120px",
    },
];

class Cinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCineplexs: [],
            isOpenModalCineplex: false,
            isOpenEditMode: false,
            CineplexEditData: {},
        };
    }

    async componentDidMount() {
        await this.props.getAllCineplexs();
        await this.getAllCineplexsFromReact();
    }

    getAllCineplexsFromReact = async () => {
        let response = await cineplexService.getAllCineplexs();
        if (response && response.errCode === 0) {
            this.setState({
                arrCineplexs: response.Cineplexs,
            });
        }
    };

    handleAddNewCineplex = () => {
        this.setState({
            isOpenModalCineplex: true,
        });
    };

    handleHideModalCineplex = () => {
        this.setState({
            isOpenModalCineplex: !this.state.isOpenModalCineplex,
        });
    };

    handleCreateNewCineplexService = async (cineplexData) => {
        try {
            let response = await cineplexService.createNewCineplex(
                cineplexData
            );
            console.log(response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllCineplexsFromReact();
                this.setState({
                    isOpenModalCineplex: !this.state.isOpenModalCineplex,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    // handleDeleteCineplex = async (id) => {
    //     console.log(id);
    //     try {
    //         let response = await CineplexService.deleteCineplexById(id);
    //         if (response && response.errCode === 0) {
    //             await this.getAllCineplexsFromReact();
    //         } else {
    //             alert(response.errMessage);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // handleEditCineplex = (item) => {
    //     this.setState({
    //         isOpenEditMode: true,
    //         CineplexEditData: { ...item },
    //     });
    // };

    // handleUpdateCineplex = async (data) => {
    //     try {
    //         let res = await CineplexService.updateCineplexById(data);
    //         if (res && res.errCode === 0) {
    //             await this.getAllCineplexsFromReact();
    //             this.setState({
    //                 isOpenEditMode: !this.state.isOpenEditMode,
    //             });
    //         } else {
    //             alert(res.errMessage);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    render() {
        console.log(this.props.cineplexList);
        return (
            <div className="cineplex-container">
                {this.state.isOpenModalCineplex && (
                    <ModalCineplex
                        isOpen={this.state.isOpenModalCineplex}
                        handleHideModalCineplex={this.handleHideModalCineplex}
                        handleCreateNewCineplexService={
                            this.handleCreateNewCineplexService
                        }
                    />
                )}
                {/* {this.state.isOpenEditMode && (
                    <ModalEditCineplex
                        isOpen={this.state.isOpenEditMode}
                        hideModalEidt={() =>
                            this.setState({
                                isOpenEditMode: !this.state.isOpenEditMode,
                            })
                        }
                        currentCineplex={this.state.CineplexEditData}
                        handleUpdateCineplex={this.handleUpdateCineplex}
                    />
                )} */}
                {/* <div className="movie-table">
                    <DataTable
                        title="List Movies"
                        columns={columns}
                        data={data}
                        theme="solarized"
                        pagination
                        highlightOnHover
                        pointerOnHover
                        // handleEditUser={this.handleEditUser}
                        onRowClicked={this.handleOnRowClick}
                    />
                </div> */}
                <div>
                    <button
                        onClick={() => this.handleAddNewCineplex()}
                        type="button"
                        class="btn btn-primary px-2 mx-1"
                    >
                        <i class="fas fa-plus mx-2"></i>
                        Add new Cineplex
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cineplexList: state.cineplex.cineplexList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCineplexs: () => dispatch(actions.fetchAllCineplexStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
