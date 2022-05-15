import axios from "../api/axios";

const cineplexService = {
    createNewCineplex: (data) => {
        return axios.post("/api/create-new-cineplex", data);
    },
    getAllCineplexs: () => {
        return axios.get("/api/get-all-cineplex");
    },
};

export default cineplexService;
