import actionTypes from "./actionTypes";
import {getAllMovies} from "../../services/movieService"
import { toast } from "react-toastify";


export const fetchAllMoviesStart = () => {
    return async (dispatch, getState) => {
        try {
            let movieList = 
        } catch(e) {
            dispatch(fetchAllMoviesFail())
            console.log("fetchAllMoviesFail", e)
        }
    }
}
export const fetchAllMoviesSuccess = (payload) => ({
    type: actionTypes.FECTH_ALL_MOVIE_SUCCESS,
    payload,
});
export const fetchAllMoviesFail = () => ({
    type: actionTypes.FECTH_ALL_MOVIE_Fail,
});
