import { movieType } from "../utils";

const movieService = {
    getMoviesList: (type, params) => {
        const url = "movie/" + movieType[type];
        console.log(axiosClient.get(url, params));
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = "movie/" + id + "/videos";
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = "search/" + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = "movie/" + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = "movie/" + id + "/credits";
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = "movie/" + id + "/similar";
        return axiosClient.get(url, { params: {} });
    },
};
