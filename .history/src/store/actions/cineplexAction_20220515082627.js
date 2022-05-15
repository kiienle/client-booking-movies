import actionTypes from "./actionTypes";
import movieService from "../../services/movieService";
import cineplexService from "../../services/cineplexService";
import { toast } from "react-toastify";

export const fetchAllCineplexStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await cineplexService.getAllCineplexs();
            console.log(res);
            if (res && res.errCode == 0) {
                dispatch(fetchAllCineplexSuccess(res.cineplexList));
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
