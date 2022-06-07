import { movieType } from "../utils";
import axiosClient from "../api/axiosClient";
import axios from "../api/axios";

const movieService = {
    getAllMovies: () => {
        return axios.get("/api/get-all-movies");
    },
    createNewMovieService: (data) => {
        return axios.post("/api/create-new-movie", data);
    },
    updateMovieById: (data) => {
        return axios.put("/api/update-movie", data);
    },
    getMoviesByState: (state) => {
        console.log(state);
        return axios.get(`/api/get-movie-by-state?state=${state}`);
    },
    getMoviesById: (id) => {
        console.log(id);
        return axios.get(`/api/get-movie-by-id?id=${id}`);
    },
    // getMoviesList: (type, params) => {
    //     const url = "movie/" + movieType[type];
    //     return axiosClient.get(url, params);
    // },
    // getVideos: (id) => {
    //     const url = "movie/" + id + "/videos";
    //     return axiosClient.get(url, { params: {} });
    // },
    // search: (params) => {
    //     const url = "search/movie";
    //     return axiosClient.get(url, params);
    // },
    // detail: (id, params) => {
    //     const url = "movie/" + id;
    //     return axiosClient.get(url, params);
    // },
    // credits: (id) => {
    //     const url = "movie/" + id + "/credits";
    //     return axiosClient.get(url, { params: {} });
    // },
    // similar: (id) => {
    //     const url = "movie/" + id + "/similar";
    //     return axiosClient.get(url, { params: {} });
    // },
};

export default movieService;
