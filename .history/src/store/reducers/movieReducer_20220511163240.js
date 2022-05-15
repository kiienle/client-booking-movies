import actionTypes from "../actions/actionTypes";

const initialState = {
    movieList: [],
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
    }
};

export default movieReducer;
