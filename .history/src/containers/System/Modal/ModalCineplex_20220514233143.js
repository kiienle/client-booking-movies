import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import "./Modal.scss";

class ModalCineplex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            name: "",
            address: "",
            previewImageUrl: "",
            fileName: "",
        };
    }
    componentDidMount() {}

    toggle = () => {
        this.props.handleHideModalCineplex();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "avatar",
            "name",
            "address",
            "previewImageUrl",
            "fileName",
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

    handleAddNewUser = () => {
        this.checkValidInput();
        this.props.handleCreateNewUserService(this.state);
        if (this.props.isOpen === false) {
            this.setState({
                avatar: "",
                name: "",
                address: "",
                previewImageUrl: "",
                fileName: "",
            });
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
                avatar: base64,
                fileName: fileName,
            });
            console.log(objectUrl);
        }
    };

    componentWillUnmount() {
        this.setState({
            avatar: "",
            name: "",
            address: "",
            previewImageUrl: "",
            fileName: "",
        });
    }
    render() {
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
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-content_">
                            <div className="modal-input">
                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.lastName}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                lastName: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Last Name
                                    </label>
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
                                        value={this.state.address}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                address: e.target.value,
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
                                    Hình ảnh của bạn
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
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCineplex);
