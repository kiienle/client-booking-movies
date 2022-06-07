import axios from "../api/axios";

const cineplexService = {
    createNewCineplex: (data) => {
        return axios.post("/api/create-new-cineplex", data);
    },
    getAllCineplexs: () => {
        return axios.get("/api/get-all-cineplex");
    },
    updateCineplexById: (data) => {
        return axios.put("/api/update-cineplex", data);
    },
    getCineplexById: (id) => {
        return axios.get(`/api/get-cineplex-by-id?id=${id}`);
    },
};

export default cineplexService;
