import actionTypes from "../actions/actionTypes";

const initialState = {
    showtimeList: [],
};

const showtimeReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FECTH_ALL_SHOWTIME_SUCCESS:
            console.log(action.payload);
            copyState.showtimeList = action.payload;
            return {
                ...copyState,
            };
        case actionTypes.FECTH_ALL_SHOWTIME_FAIL:
            copyState.showtimeList = [];
            return {
                ...copyState,
            };
        default:
            return state;
    }
};

export default showtimeReducer;
