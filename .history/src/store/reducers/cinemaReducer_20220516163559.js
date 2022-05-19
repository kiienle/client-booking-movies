import actionTypes from "../actions/actionTypes";

const initialState = {
    cinemaList: [],
    cineType: [],
};

const cinemaReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FECTH_ALL_CINEMA_SUCCESS:
            console.log(action.payload);
            copyState.cinemaList = action.payload;
            return {
                ...copyState,
            };
        case actionTypes.FECTH_ALL_CINEMA_FAIL:
            copyState.cinemaList = [];
            return {
                ...copyState,
            };
        default:
            return state;
    }
};

export default cinemaReducer;
