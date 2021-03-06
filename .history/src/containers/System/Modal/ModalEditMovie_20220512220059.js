import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import _ from "lodash";
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
            posterName: "",
            backgroundName: "",
            previewPosterUrl: "",
            previewBackgroundUrl: "",
            currentDate: "",
        };
    }
    componentDidMount() {
        let movie = this.props.currentMovie;
        let posterBase64 = "";
        let releaseDate;
        if (movie && !_.isEmpty(movie)) {
            posterBase64 = new Buffer(movie.poster, "base64").toString(
                "binary"
            );
            releaseDate = moment
                .unix(movie.release_date / 1000)
                .format("DD-MM-YYYY");
            console.log(posterBase64);
            this.setState({
                previewPosterUrl: posterBase64,
                previewBackgroundUrl: movie.background,
                title: movie.title,
                description: movie.description,
                director: movie.director,
                actor: movie.actor,
                genre: movie.genre,
                trailer: movie.trailer,
                release_date: releaseDate,
                running_time: movie.running_time,
                state: movie.state,
                active: movie.active,
                background: movie.background,
            });
        }
    }

    toggle = () => {
        this.props.hideModalEdit();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "title",
            "description",
            "director",
            "actor",
            "genre",
            "release_date",
            "running_time",
            "state",
            "active",
            "poster",
            "background",
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

    handleChangePoster = async (e) => {
        let data = e.target.files;
        let file = data[0];
        let posterName = file.name;

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewPosterUrl: objectUrl,
                poster: base64,
                posterName,
            });
            console.log(objectUrl);
        }
    };
    handleChangeBackground = async (e) => {
        let data = e.target.files;
        let file = data[0];
        let backgroundName = file.name;

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewBackgroundUrl: objectUrl,
                background: base64,
                backgroundName,
            });
            console.log(objectUrl);
        }
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            release_date: Date.parse(date[0]),
        });
    };

    handleUpdateMovie = () => {
        this.checkValidInput();
        this.props.handleUpdateMovie(this.state);
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
                posterName: "",
            });
        }
    };

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
        console.log(this.state);
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
                                    <DatePicker
                                        className="form-input"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.release_date}
                                        minDate={moment(new Date())
                                            .subtract(1, "days")
                                            .toDate()}
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
                                    H??nh ???nh b??? phim
                                </div>
                                <div className="file-input-body">
                                    <div className="file-input-label">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>
                                            Drag & Drop your file here <br /> or
                                        </p>
                                        <div className="btn btn-primary px-2">
                                            Ch???n ???nh b??a
                                        </div>
                                    </div>
                                    <div className="file-input-label">
                                        <div className="btn btn-primary px-2 mt-5">
                                            Ch???n ???nh n???n
                                        </div>
                                    </div>
                                    <input
                                        className="poster-input"
                                        type="file"
                                        value=""
                                        onChange={(e) =>
                                            this.handleChangePoster(e)
                                        }
                                    />
                                    <input
                                        className="background-input"
                                        type="file"
                                        value=""
                                        onChange={(e) =>
                                            this.handleChangeBackground(e)
                                        }
                                    />
                                </div>
                                {this.state.previewPosterUrl && (
                                    <div className="file-preview-image">
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewPosterUrl})`,
                                            }}
                                        ></div>
                                        <p>???nh thumbnail phim</p>
                                        <i class="fas fa-check"></i>
                                    </div>
                                )}
                                {this.state.previewBackgroundUrl && (
                                    <div className="file-preview-image">
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewBackgroundUrl})`,
                                            }}
                                        ></div>
                                        <p>???nh n???n phim</p>
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
                        onClick={() => this.handleUpdateMovie}
                    >
                        Update Movie
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
