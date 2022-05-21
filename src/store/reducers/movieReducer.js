import actionTypes from "../actions/actionTypes";

const initialState = {
    movieList: [],
    moviesPopular: [],
};

const movieReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FECTH_ALL_MOVIE_SUCCESS:
            copyState.movieList = action.payload;
            return {
                ...copyState,
            };
        case actionTypes.FECTH_ALL_MOVIE_FAIL:
            copyState.movieList = [];
            return {
                ...copyState,
            };
        case actionTypes.FECTH_MOVIE_BY_STATE_SUCCESS:
            copyState.moviesByState = action.payload;
            return {
                ...copyState,
            };
        case actionTypes.FECTH_MOVIE_BY_STATE_FAIL:
            copyState.moviesByState = [];
            return {
                ...copyState,
            };
        default:
            return state;
    }
};

export default movieReducer;
