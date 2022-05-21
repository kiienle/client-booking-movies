import axios from "../api/axios";

const cinemaService = {
    createNewCinema: (data) => {
        return axios.post("/api/create-new-cinema", data);
    },
    getAllCinemas: () => {
        return axios.get("/api/get-all-cinema");
    },
    getCinemasByCineplexId: (id) => {
        return axios.get(`/api/get-cinema-by-id?id=${id}`);
    },
    updateCinemaById: (data) => {
        return axios.put("/api/update-cinema", data);
    },
};

export default cinemaService;
