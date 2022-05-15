import React, { Component } from "react";
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
            console.log(posterBase64);
            return <img src={posterBase64} style={{ width: 120 }} />;
        },
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
    },
    {
        name: "State",
        selector: (row) => row.state,
        width: "80px",
    },
    {
        name: "Active",
        selector: (row) => row.active,
        width: "80px",
    },
    {
        name: "Action",
        selector: (row) => row.actiion,
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
