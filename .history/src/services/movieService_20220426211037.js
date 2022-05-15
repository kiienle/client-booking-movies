import { movieType } from "../utils";
import axiosClient from "../api/axiosClient";

const movieService = {
    getMoviesList: (type, params) => {
        const url = "movie/" + movieType[type];
        console.log(axiosClient.get(url, params));
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
