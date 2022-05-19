import actionTypes from "./actionTypes";
import cinemaService from "../../services/cinemaService";
import { toast } from "react-toastify";

export const fetchAllCinemaStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await cinemaService.getAllCinemas();
            if (res && res.errCode == 0) {
                dispatch(fetchAllCinemaSuccess(res.cinemaList));
            } else {
                dispatch(fetchAllCinemaFail());
            }
        } catch (e) {
            dispatch(fetchAllCinemaFail());
            console.log("fetchAllCinemaFail", e);
        }
    };
};
export const fetchAllCinemaSuccess = (payload) => ({
    type: actionTypes.FECTH_ALL_CINEMA_SUCCESS,
    payload,
});
export const fetchAllCinemaFail = () => ({
    type: actionTypes.FECTH_ALL_CINEMA_FAIL,
});

export const fetchCinemaByIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await cinemaService.getCinemasByCineplexId(id);
            if (res && res.errCode === 0) {
                dispatch(fetchCinemaByIdSuccess(res.data));
            } else {
                dispatch(fetchCinemaByIdFail());
            }
        } catch (e) {
            dispatch(fetchCinemaByIdFail());
            console.log("fetchCinemaByIdFail", e);
        }
    };
};
export const fetchCinemaByIdSuccess = (payload) => ({
    type: actionTypes.FECTH_CINEMAS_BY_ID_SUCCESS,
    payload,
});
export const fetchCinemaByIdFail = () => ({
    type: actionTypes.FECTH_CINEMAS_BY_ID_FAIL,
});
