import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import _ from "lodash";
import "./Modal.scss";

class ModalEditCineplex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            image: "",
            name: "",
            address: "",
            googleMapsUrl: "",
            previewImageUrl: "",
            fileName: "",
        };
    }
    componentDidMount() {
        let cineplex = this.props.currentCineplex;
        let imageBase64 = "";
        if (cineplex && !_.isEmpty(cineplex)) {
            imageBase64 = new Buffer(cineplex.image, "base64").toString(
                "binary"
            );
            this.setState({
                id: cineplex.id,
                image: imageBase64,
                name: cineplex.name,
                address: cineplex.address,
                googleMapsUrl: cineplex.googleMapsUrl,
                previewImageUrl: imageBase64,
                fileName: cineplex.fileName,
            });
        }
    }

    toggle = () => {
        this.props.hideModalEidt();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ["image", "name", "address", "googleMapsUrl"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parametor: ${arrInput[i]}`);
                break;
            }
            return isValid;
        }
    };

    handleChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        let fileName = file.name;

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                image: base64,
                fileName: fileName,
            });
            console.log(objectUrl);
        }
    };

    handleUpdateCineplex = () => {
        console.log(this.state);
        this.checkValidInput();
        this.props.handleUpdateCineplex(this.state);
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
        console.log(this.state);
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
                    Edit Cineplex
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
                                                backgroundImage: `url(${this.state.previewBackgroundUrl})`,
                                            }}
                                        ></div>
                                        <p>Ảnh nền phim</p>
                                        <i class="fas fa-check"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleUpdateCineplex()}
                    >
                        Update Cineplex
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCineplex);
