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
