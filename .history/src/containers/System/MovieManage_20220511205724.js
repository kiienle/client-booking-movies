import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import DataTable from "react-data-table-component";
import movieService from "../../services/movieService";

const columns = [
    {
        name: "ID",
        selector: (row) => row.ID,
    },
    {
        name: "Title",
        selector: (row) => row.title,
    },
    {
        name: "Director",
        selector: (row) => row.director,
    },
    {
        name: "Actor",
        selector: (row) => row.actor,
    },
    {
        name: "Genre",
        selector: (row) => row.genre,
    },
    {
        name: "Running Time",
        selector: (row) => row.running_time,
    },
    {
        name: "Release Date",
        selector: (row) => row.release_date,
    },
    {
        name: "Trailer",
        selector: (row) => row.trailer,
    },
    {
        name: "State",
        selector: (row) => row.state,
    },
    {
        name: "Active",
        selector: (row) => row.active,
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
        };
    }

    async componentDidMount() {
        this.props.getAllMovie();
        console.log(this.props.movieList);
    }

    handleGetAllMovies = () => {
        if (this.props.movieList && this.props.movieList.length > 0) {
            let copyState = { ...this.state };
            copyState.data = this.props.movieList;
            this.setState({
                ...copyState,
            });
        }
    };

    render() {
        const { data } = this.state;
        console.log(data);
        return (
            <div className="text-center">
                <DataTable columns={columns} data={data} />
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
