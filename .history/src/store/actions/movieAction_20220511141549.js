import actionTypes from "./actionTypes";

export const fetchAllMovieSuccess = (payload) => ({
    type: actionTypes.FECTH_ALL_MOVIE_SUCCESS,
    payload,
});
export const fetchAllMovieFail = () => ({
    type: actionTypes.FECTH_ALL_MOVIE_Fail,
});
