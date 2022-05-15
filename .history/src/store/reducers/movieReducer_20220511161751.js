import actionTypes from "../actions/actionTypes";

const initialState = {
    movieList: [],
};

const movieReducer = (state, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FECTH_ALL_MOVIE_SUCCESS:
            copyState.movieList = action.payload;
            return {
                ...copyState,
            };
    }
};
