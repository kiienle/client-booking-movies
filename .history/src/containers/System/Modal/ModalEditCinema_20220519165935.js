import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import { allCodeService } from "../../../services";
import MonitorImage from "../../../assets/images/monitor.png";
import * as actions from "../../../store/actions";
import _ from "lodash";
import "./Modal.scss";

class ModalEditCinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            cineplex_id: "",
            cinema_type: "",
            vertical_size: "",
            horizontal_size: "",
            cineType: [],
        };
    }
    async componentDidMount() {
        await this.props.getAllCineplexes();
        await this.getCineTypeAllcode();
        let cinema = this.props.currentCinema;
        this.setState({
            id: cinema.id,
            name: cinema.name,
            cineplex_id: cinema.cineplex_id,
            cinema_type: cinema.cinema_type,
            vertical_size: cinema.vertical_size,
            horizontal_size: cinema.horizontal_size,
        });
    }

    toggle = () => {
        this.props.hideModalEidt();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "id",
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

    getCineTypeAllcode = async () => {
        let response = await allCodeService.getAllcode("CINETYPE");
        if (response && response.data && response.errCode === 0) {
            this.setState({
                cineType: response.data,
            });
        }
    };

    handleUpdateCinema = () => {
        console.log(this.state);
        let valid = this.checkValidInput();
        if (valid === true) {
            this.props.handleUpdateCinema(this.state);
        }
        if (this.props.isOpen === false) {
            this.setState({
                image: "",
                name: "",
                address: "",
                googleMapsUrl: "",
                previewImageUrl: "",
                fileName: "",
            });
        }
    };

    componentWillUnmount() {
        this.setState({
            image: "",
            name: "",
            address: "",
            googleMapsUrl: "",
            previewImageUrl: "",
            fileName: "",
        });
    }
    render() {
        console.log(this.props.currentCinema);
        const { cineplexList } = this.props;
        const { horizontal_size, vertical_size, cineType } = this.state;
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
                    Edit cinema
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-content_">
                            <div className="modal-input">
                                <div className="input-container">
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="cineplex"
                                        value={this.state.cineplex_id}
                                        onChange={(e) =>
                                            this.setState({
                                                cineplex_id: e.target.value,
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
                                    <select
                                        className="form-input"
                                        style={{ width: 432 + "px" }}
                                        name="cinema type"
                                        value={this.state.cinema_type}
                                        onChange={(e) =>
                                            this.setState({
                                                cinema_type: e.target.value,
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
                                    <input
                                        placeholder=" "
                                        min="1"
                                        className="form-input"
                                        value={this.state.horizontal_size}
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
                                        value={this.state.vertical_size}
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
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleUpdateCinema()}
                    >
                        Update cinema
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCinema);
