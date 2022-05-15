import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Cinema.scss";
import cineplexService from "../../../services/CineplexService";
// import ModalCineplex from "../Modal/ModalCineplex.js";
import ModalEditCineplex from "../Modal/ModalEditCineplex";

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
        await this.getAllCineplexsFromReact();
    }

    getAllCineplexsFromReact = async () => {
        let response = await CineplexService.getAllCineplexs("ALL");
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

    handleCreateNewCineplexService = async (CineplexData) => {
        try {
            let response = await CineplexService.createNewCineplexService(
                CineplexData
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

    handleDeleteCineplex = async (id) => {
        console.log(id);
        try {
            let response = await CineplexService.deleteCineplexById(id);
            if (response && response.errCode === 0) {
                await this.getAllCineplexsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditCineplex = (item) => {
        this.setState({
            isOpenEditMode: true,
            CineplexEditData: { ...item },
        });
    };

    handleUpdateCineplex = async (data) => {
        try {
            let res = await CineplexService.updateCineplexById(data);
            if (res && res.errCode === 0) {
                await this.getAllCineplexsFromReact();
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

    render() {
        return (
            <div className="Cineplexs-container">
                {this.state.isOpenModalCineplex && (
                    <ModalCineplex
                        isOpen={this.state.isOpenModalCineplex}
                        handleHideModalCineplex={this.handleHideModalCineplex}
                        handleCreateNewCineplexService={
                            this.handleCreateNewCineplexService
                        }
                    />
                )}
                {this.state.isOpenEditMode && (
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
                )}
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
