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
};

export default showtimeService;
