import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
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
        };
    }
    componentDidMount() {
        this.props.getAllCineplex();
    }

    toggle = () => {
        this.props.handleHideModalCinema();
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
        console.log(this.props.cineplexList);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-container"}
                size="lg"
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
                                        className="form-input"
                                        value={this.state.address}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                address: e.target.value,
                                            })
                                        }
                                    />
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
                            </div>
                            <div className="file-input">
                                <div className="file-input-title">
                                    Hình ảnh của cụm rạp
                                </div>
                                <div className="file-input-body">
                                    <div className="file-input-label">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>
                                            Drag & Drop your file here <br /> or
                                        </p>
                                        <div className="btn btn-primary px-2">
                                            Chọn ảnh
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        value=""
                                        onChange={(e) =>
                                            this.handleChangeImage(e)
                                        }
                                    />
                                </div>
                                {this.state.previewImageUrl && (
                                    <div className="file-preview-image">
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewImageUrl})`,
                                            }}
                                        ></div>
                                        {this.state.fileName && (
                                            <Fragment>
                                                <p>{this.state.fileName}</p>
                                                <span>.jpg</span>
                                                <i class="fas fa-check"></i>
                                            </Fragment>
                                        )}
                                    </div>
                                )}
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
        getAllCineplex: () => dispatch(actions.fetchAllCineplexStart),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCinema);
