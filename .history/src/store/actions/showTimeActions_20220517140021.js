import actionTypes from "./actionTypes";
import showtimeService from "../../services/showtimeService";
import { toast } from "react-toastify";

export const fetchAllShowtimeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await showtimeService.getAllShowtimes();
            if (res && res.errCode == 0) {
                dispatch(fetchAllShowtimeSuccess(res.ShowtimeList));
            } else {
                dispatch(fetchAllShowtimeFail());
            }
        } catch (e) {
            dispatch(fetchAllShowtimeFail());
            console.log("fetchAllShowtimeFail", e);
        }
    };
};
export const fetchAllShowtimeSuccess = (payload) => ({
    type: actionTypes.FECTH_ALL_SHOWTIME_SUCCESS,
    payload,
});
export const fetchAllShowtimeFail = () => ({
    type: actionTypes.FECTH_ALL_SHOWTIME_FAIL,
});
