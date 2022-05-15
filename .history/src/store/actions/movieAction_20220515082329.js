import actionTypes from "./actionTypes";
import movieService from "../../services/movieService";
import cineplexService from "../../services/cineplexService";
import { toast } from "react-toastify";

export const fetchAllMoviesStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await movieService.getAllMovies();
            console.log(res);
            if (res && res.errCode == 0) {
                dispatch(fetchAllMoviesSuccess(res.movieList));
            } else {
                dispatch(fetchAllMoviesFail());
            }
        } catch (e) {
            dispatch(fetchAllMoviesFail());
            console.log("fetchAllMoviesFail", e);
        }
    };
};
export const fetchAllMoviesSuccess = (payload) => ({
    type: actionTypes.FECTH_ALL_MOVIE_SUCCESS,
    payload,
});
export const fetchAllMoviesFail = () => ({
    type: actionTypes.FECTH_ALL_MOVIE_FAIL,
});

export const fetchAllCineplexStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await cineplexService.getAllCineplex();
            console.log(res);
            if (res && res.errCode == 0) {
                dispatch(fetchAllCineplexSuccess(res.movieList));
            } else {
                dispatch(fetchAllCineplexFail());
            }
        } catch (e) {
            dispatch(fetchAllCineplexFail());
            console.log("fetchAllCineplexFail", e);
        }
    };
};
export const fetchAllCineplexSuccess = (payload) => ({
    type: actionTypes.FECTH_ALL_MOVIE_SUCCESS,
    payload,
});
export const fetchAllCineplexFail = () => ({
    type: actionTypes.FECTH_ALL_MOVIE_FAIL,
});
