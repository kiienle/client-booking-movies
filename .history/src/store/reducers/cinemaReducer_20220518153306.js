import actionTypes from "../actions/actionTypes";

const initialState = {
    cinemaList: [],
    cinemaListById: [],
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
        case actionTypes.FECTH_CINEMAS_BY_ID_SUCCESS:
            console.log(action.payload);
            copyState.cinemaListById = action.payload;
            return {
                ...copyState,
            };
        case actionTypes.FECTH_CINEMAS_BY_ID_FAIL:
            copyState.cinemaListById = [];
            return {
                ...copyState,
            };
        default:
            return state;
    }
};

export default cinemaReducer;
