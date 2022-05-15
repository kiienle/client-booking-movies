import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import "./Modal.scss";

class ModalMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: "",
            title: "",
            description: "",
            director: "",
            actor: "",
            genre: "",
            trailer: "",
            release_date: "",
            running_time: "",
            state: "",
            active: "",
            background: "",
            fileName: "",
            previewImageUrl: "",
        };
    }
    componentDidMount() {}

    toggle = () => {
        this.props.handleHideModalMovie();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "poster",
            "title",
            "description",
            "director",
            "genre",
            "release_date",
            "running_time",
            "state",
            "active",
            "background",
            "actor",
            "trailer",
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

    handleAddNewMovie = () => {
        this.checkValidInput();
        this.props.handleCreateNewMovieService(this.state);
        if (this.props.isOpen === false) {
            this.setState({
                poster: "",
                title: "",
                description: "",
                director: "",
                actor: "",
                genre: "",
                trailer: "",
                release_date: "",
                running_time: "",
                state: "",
                active: "",
                background: "",
                fileName: "",
            });
        }
    };

    handleChangeImage = async (e, key) => {
        let data = e.target.files;
        let file = data[0];
        let fileName = file.name;

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                copyState: base64,
                fileName: fileName,
            });
            console.log(objectUrl);
        }
    };

    componentWillUnmount;

    componentWillUnmount() {
        this.setState({
            poster: "",
            title: "",
            description: "",
            director: "",
            actor: "",
            genre: "",
            trailer: "",
            release_date: "",
            running_time: "",
            state: "",
            active: "",
            background: "",
            fileName: "",
        });
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-container"}
                size="xl"
            >
                <ModalHeader
                    className="form-title"
                    toggle={() => this.toggle()}
                >
                    Create a new movie
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-content_">
                            <div className="modal-input modal-movie">
                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.title}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Movie title
                                    </label>
                                </div>

                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.director}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                director: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Director
                                    </label>
                                </div>

                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.actor}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                actor: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">Actor</label>
                                </div>
                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.genre}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                genre: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">Genre</label>
                                </div>

                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.release_date}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                release_date: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Release Date
                                    </label>
                                </div>
                                <div className="input-container">
                                    <input
                                        placeholder=" "
                                        className="form-input"
                                        value={this.state.running_time}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                running_time: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Running Time
                                    </label>
                                </div>
                                <div class="select-container">
                                    <select
                                        className="select-box"
                                        name="state"
                                        value={this.state.state}
                                        onChange={(e) =>
                                            this.setState({
                                                state: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose state
                                        </option>
                                        <option value="M">Coming Soon</option>
                                        <option value="F">Now Showing</option>
                                    </select>

                                    <select
                                        className="select-box"
                                        name="active"
                                        value={this.state.active}
                                        onChange={(e) =>
                                            this.setState({
                                                active: e.target.value,
                                            })
                                        }
                                    >
                                        <option
                                            value=""
                                            selected="selected"
                                            hidden="hidden"
                                        >
                                            Choose active
                                        </option>
                                        <option value="R1">True</option>
                                        <option value="R2">False</option>
                                    </select>
                                </div>
                                <div className="input-container movie-description">
                                    <textarea
                                        placeholder=" "
                                        rows="2"
                                        className="form-input"
                                        value={this.state.description}
                                        onChange={(e) =>
                                            this.setState({
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                    <label className="form-label">
                                        Movie description
                                    </label>
                                </div>
                            </div>
                            <div className="file-input">
                                <div className="file-input-title">
                                    Hình ảnh bộ phim
                                </div>
                                <div className="file-input-body">
                                    <div className="file-input-label">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>
                                            Drag & Drop your file here <br /> or
                                        </p>
                                        <div className="btn btn-primary px-2">
                                            Chọn ảnh bìa
                                        </div>
                                    </div>
                                    <div className="file-input-label">
                                        <div className="btn btn-primary px-2 mt-3">
                                            Chọn ảnh nền
                                        </div>
                                    </div>
                                    <input
                                        className="poster-input"
                                        type="file"
                                        value=""
                                        onChange={(e) =>
                                            this.handleChangeImage(e)
                                        }
                                    />
                                    <input
                                        className="background-input"
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalMovie);
