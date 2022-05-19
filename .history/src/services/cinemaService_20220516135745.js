import axios from "../api/axios";

const cinemaService = {
    createNewCinema: (data) => {
        return axios.post("/api/create-new-cinema", data);
    },
    getAllCinemas: () => {
        return axios.get("/api/get-all-cinema");
    },
    updateCinemaById: (data) => {
        return axios.put("/api/update-cinema", data);
    },
    getCinetypeAllcode: (type) => {
        console.log(type);
        return axios.get(`/api/get-allcode?type=${type}`);
    },
};

export default cinemaService;
