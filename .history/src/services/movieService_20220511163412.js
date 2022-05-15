import { movieType } from "../utils";
import axiosClient from "../api/axiosClient";
import axios from "../api/axios";

const movieService = {
    getAllMovies: () => {
        return axios.get("/api/get-all-movies");
    },
    getMoviesList: (type, params) => {
        const url = "movie/" + movieType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (id) => {
        const url = "movie/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    search: (params) => {
        const url = "search/movie";
        return axiosClient.get(url, params);
    },
    detail: (id, params) => {
        const url = "movie/" + id;
        return axiosClient.get(url, params);
    },
    credits: (id) => {
        const url = "movie/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
    similar: (id) => {
        const url = "movie/" + id + "/similar";
        return axiosClient.get(url, { params: {} });
    },
};

export default movieService;
