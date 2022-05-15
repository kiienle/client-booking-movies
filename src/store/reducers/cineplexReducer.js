import actionTypes from "../actions/actionTypes";

const initialState = {
    cineplexList: [],
};

const cineplexReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FECTH_ALL_CINEPLEX_SUCCESS:
            console.log(action.payload);
            copyState.cineplexList = action.payload;
            return {
                ...copyState,
            };
        case actionTypes.FECTH_ALL_CINEPLEX_FAIL:
            console.log("helll");
            copyState.cineplexList = [];
            return {
                ...copyState,
            };
        default:
            return state;
    }
};

export default cineplexReducer;
