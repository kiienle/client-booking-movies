import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Image } from "reactstrap";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import DataTable, { createTheme } from "react-data-table-component";
import movieService from "../../../services/movieService";
import ModalMovie from "../Modal/ModalMovie";
import moment from "moment";
import "./MovieManage.scss";

createTheme({
    background: {
        default: "transparent",
    },
    action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
    },
});

const columns = [
    {
        name: "ID",
        selector: (row) => row.id,
        width: "50px",
    },
    {
        name: "Poster",
        selector: (row) => {
            let posterBase64;
            if (row.poster) {
                posterBase64 = new Buffer(row.poster, "base64").toString(
                    "binary"
                );
            }
            return <img src={posterBase64} style={{ width: 120 }} />;
        },
        width: "152px",
    },
    {
        name: "Title",
        selector: (row) => row.title,
        hide: false,
    },
    {
        name: "Release Date",
        selector: (row) =>
            moment.unix(row.release_date / 1000).format("DD-MM-YYYY"),
        width: "120px",
    },
    {
        name: "Running Time",
        selector: (row) => row.running_time,
        width: "120px",
    },
    {
        name: "State",
        selector: (row) => row.state,
        width: "80px",
    },
    {
        name: "Action",
        selector: (row) => {
            return (
                <div>
                    <button
                        className="btn btn-warning mx-2"
                        // onClick={() => handleEditUser}
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                        className="btn btn-danger mx-2"
                        onClick={() => this.handleDeleteUser()}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            );
        },
        button: true,
        width: "110px",
    },
];

class MovieManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isOpenModalMovie: false,
            isOpenEditMode: false,
        };
    }

    async componentDidMount() {
        this.handleGetAllMovies();
    }

    handleAddNewMovie = () => {
        this.setState({
            isOpenModalMovie: true,
        });
    };
    handleHideModalMovie = () => {
        this.setState({
            isOpenModalMovie: false,
        });
    };

    handleGetAllMovies = async () => {
        await this.props.getAllMovie();
        if (this.props.movieList && this.props.movieList.length > 0) {
            let copyState = { ...this.state };
            copyState.data = this.props.movieList;
            this.setState({
                ...copyState,
            });
        }
    };

    handleCreateNewMovieService = async (movieData) => {
        console.log(movieData);
        try {
            let response = await movieService.createNewMovieService(movieData);
            if (response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                this.handleGetAllMovies();
                this.setState({
                    isOpenModalMovie: !this.state.isOpenModalMovie,
                });
                toast.success("Create a new movie succeed");
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = () => {
        console.log("hello");
    };

    render() {
        const { data } = this.state;
        console.log(this.state);
        return (
            <div className="movie-manage">
                {this.state.isOpenModalMovie && (
                    <ModalMovie
                        isOpen={this.state.isOpenModalMovie}
                        handleHideModalMovie={this.handleHideModalMovie}
                        handleCreateNewMovieService={
                            this.handleCreateNewMovieService
                        }
                    />
                )}
                <div className="mx-1">
                    <button
                        onClick={() => this.handleAddNewMovie()}
                        type="button"
                        class="btn btn-primary px-2 mx-1"
                    >
                        <i class="fas fa-plus mx-2"></i>
                        Add new movie
                    </button>
                </div>
                <div className="movie-table">
                    <DataTable
                        title="Arnold Movies"
                        columns={columns}
                        data={data}
                        theme="solarized"
                        pagination
                        highlightOnHover
                        pointerOnHover
                        // handleEditUser={this.handleEditUser}
                        // onRowClicked={(row, this.handleEditUser)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieList: state.movie.movieList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovie: () => dispatch(actions.fetchAllMoviesStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieManage);
