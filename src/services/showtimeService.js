import axios from "../api/axios";

const showtimeService = {
    createNewShowtime: (data) => {
        return axios.post("/api/create-new-showtime", data);
    },
    getAllShowtimes: () => {
        return axios.get("/api/get-all-showtime");
    },
    updateShowtimeById: (data) => {
        return axios.put("/api/update-showtime", data);
    },
    getShowtimeByDate: (cinema_id, cineplex_id, date, movie_id) => {
        console.log(cinema_id, cineplex_id, date);
        return axios.get(
            `/api/get-showtime-by-date?date=${date}&cinema_id=${cinema_id}&cineplex_id=${cineplex_id}&movie_id=${movie_id}`
        );
    },
};

export default showtimeService;
