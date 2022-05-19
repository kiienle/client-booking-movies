import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import cinemaService from "../../../services/cinemaService";
import "./Modal.scss";

class ModalCinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cineplex_id: "",
            cinema_type: "",
            vertical_size: "",
            horizontal_size: "",
            cineType: [],
        };
    }
    componentDidMount() {
        this.props.getAllCineplexes();
        this.getCineTypeAllcode();
    }

    toggle = () => {
        this.props.handleHideModalCinema();
    };

    getCineTypeAllcode = async () => {
        let response = await cinemaService.getCinetypeAllcode("CINETYPE");
        if (response && response.data && response.errCode === 0) {
            this.setState({
                cineType: response.data,
            });
        }
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "name",
            "cineplex_id",
            "cinema_type",
            "vertical_size",
            "horizontal_size",
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

    handleAddNewCineplex = () => {
        this.checkValidInput();
        this.props.handleCreateNewCineplexService(this.state);
        if (this.props.isOpen === false) {
            this.setState({
                name: "",
                cineplex_id: "",
                cinema_type: "",
                vertical_size: "",
                horizontal_size: "",
            });
        }
    };

    // handleChangeImage = async (e) => {
    //     let data = e.target.files;
    //     let file = data[0];
    //     let fileName = file.name;

    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file);
    //         let objectUrl = URL.createObjectURL(file);
    //         this.setState({
    //             previewImageUrl: objectUrl,
    //             image: base64,
    //             fileName: fileName,
    //         });
    //         console.log(objectUrl);
    //     }
    // };

    componentWillUnmount() {
        this.setState({
            name: "",
            cineplex_id: "",
            cinema_type: "",
            vertical_size: "",
            horizontal_size: "",
        });
    }
    render() {
        const { cineplexList } = this.props;
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
                    Create a new Cineplex
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-content_">
                            <div className="modal-input">
                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 440 + "px" }}
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={(e) =>
                                            this.setState({
                                                gender: e.target.value,
                                            })
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
                                </div>

                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 440 + "px" }}
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={(e) =>
                                            this.setState({
                                                gender: e.target.value,
                                            })
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
                                        Address
                                    </label>
                                </div>
                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.googleMapsUrl}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                googleMapsUrl: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Google maps URL
                                    </label>
                                </div>
                                <div class="select-container">
                                    <select
                                        className="select-box"
                                        name="roleId"
                                        value={this.state.roleId}
                                        onChange={(e) =>
                                            this.setState({
                                                roleId: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose role
                                        </option>
                                        <option value="R1">Admin</option>
                                        <option value="R2">Doctor</option>
                                        <option value="R3">Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleAddNewCineplex()}
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
        cineplexList: state.cineplex.cineplexList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCineplexes: () => dispatch(actions.fetchAllCineplexStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCinema);
