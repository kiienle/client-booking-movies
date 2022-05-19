import actionTypes from "./actionTypes";
import cinemaService from "../../services/cinemaService";
import { toast } from "react-toastify";

export const fetchCinetypeAllcodeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await cinemaService.getCinetypeAllcode();
            if (res && res.errCode == 0) {
                dispatch(fetchCinetypeAllcodeSuccess(res.cineType));
            } else {
                dispatch(fetchCinetypeAllcodeFail());
            }
        } catch (e) {
            dispatch(fetchCinetypeAllcodeFail());
            console.log("fetchCinetypeAllcodeFail", e);
        }
    };
};
export const fetchCinetypeAllcodeSuccess = (payload) => ({
    type: actionTypes.FECTH_CINETYPE_ALLCODE_SUCCESS,
    payload,
});
export const fetchCinetypeAllcodeFail = () => ({
    type: actionTypes.FECTH_CINETYPE_ALLCODE_FAIL,
});
