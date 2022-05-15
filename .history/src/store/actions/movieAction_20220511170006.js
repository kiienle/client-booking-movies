import actionTypes from "./actionTypes";
import movieService from "../../services/movieService";
import { toast } from "react-toastify";

// export const fetchAllMoviesStart = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await movieService.getAllMovies();
//             console.log(res);
//             if (res && res.errCode == 0) {
//                 dispatch(fetchAllMoviesSuccess(res.movieList));
//             } else {
//                 dispatch(fetchAllMoviesFail());
//             }
//         } catch (e) {
//             dispatch(fetchAllMoviesFail());
//             console.log("fetchAllMoviesFail", e);
//         }
//     };
// };
// export const fetchAllMoviesSuccess = (payload) => ({
//     type: actionTypes.FECTH_ALL_MOVIE_SUCCESS,
//     payload,
// });
// export const fetchAllMoviesFail = () => ({
//     type: actionTypes.FECTH_ALL_MOVIE_Fail,
// });
