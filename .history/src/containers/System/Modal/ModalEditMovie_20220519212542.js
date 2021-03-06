import { times } from "lodash";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import { LANGUAGES } from "../../../utils";
import { allCodeService } from "../../../services";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import _ from "lodash";
import "./Modal.scss";

class ModalMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
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
            movieState: [],
        };
    }
    componentDidMount() {
        this.hadleGetStateAllcode();
        let movie = this.props.currentMovie;
        let posterBase64 = "";
        let backgroundBase64 = "";
        let releaseDate;
        if (movie && !_.isEmpty(movie)) {
            posterBase64 = new Buffer(movie.poster, "base64").toString(
                "binary"
            );
            backgroundBase64 = new Buffer(movie.background, "base64").toString(
                "binary"
            );
            releaseDate = moment
                .unix(movie.release_date / 1000)
                .format("DD-MM-YYYY");
            this.setState({
                id: movie.id,
                previewPosterUrl: posterBase64,
                previewBackgroundUrl: backgroundBase64,
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
                background: backgroundBase64,
                poster: posterBase64,
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

    hadleGetStateAllcode = async () => {
        let response = await allCodeService.getAllCode("STATE");
        if (response.errCode === 0 && response.data.length > 0) {
            this.setState({
                movieState: response.data,
            });
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
        console.log(typeof this.state.release_date);
    };

    handleUpdateMovie = () => {
        let valid = this.checkValidInput();
        const copyState = this.state;
        let releaseDate = copyState.release_date;

        if (typeof releaseDate !== Number && releaseDate.search("-") !== -1) {
            releaseDate = releaseDate.split("-");
            let convertDateToTimestemp = new Date(
                releaseDate[2],
                releaseDate[1] - 1,
                releaseDate[0]
            ).getTime();
            console.log(convertDateToTimestemp);
            copyState.release_date = convertDateToTimestemp;
        }
        if (valid) {
            this.props.handleUpdateMovie(copyState);
        }
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
        console.log(this.state.release_date);
        const { movieState } = this.state;
        const { language } = this.props;
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
                                        // minDate={moment(new Date())
                                        //     .subtract(1, "days")
                                        //     .toDate()}
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
                                <div
                                    className="d-flex justify-content-between"
                                    style={{ width: 432 + "px" }}
                                >
                                    <div
                                        className="input-container"
                                        style={{ width: 200 + "px" }}
                                    >
                                        <select
                                            className="form-input"
                                            style={{ width: 200 + "px" }}
                                            name="Movie state"
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
                                            {movieState &&
                                                movieState.length > 0 &&
                                                movieState.map((item) => {
                                                    return (
                                                        <option
                                                            key={item.id}
                                                            value={item.keyMap}
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <label className="form-label">
                                            State
                                        </label>
                                    </div>
                                    <div
                                        className="input-container"
                                        style={{ width: 200 + "px" }}
                                    >
                                        <select
                                            className="form-input"
                                            style={{ width: 200 + "px" }}
                                            name="Movie state"
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
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                        <label className="form-label">
                                            Active
                                        </label>
                                    </div>
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
                        onClick={() => this.handleUpdateMovie()}
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
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalMovie);
