import axios from "../api/axios";

const cinemaService = {
    createNewCinema: (data) => {
        return axios.post("/api/create-new-cinema", data);
    },
    getAllCinemas: () => {
        return axios.get("/api/get-all-cinema");
    },
    updateCinemaById: (data) => {
        console.log(data);
        return axios.put("/api/update-cinema", data);
    },
};

export default cinemaService;
