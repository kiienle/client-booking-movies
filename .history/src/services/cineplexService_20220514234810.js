import axios from "../api/axios";

const cineplexService = {
    createNewCineplex: (data) => {
        return axios.post("/api/create-new-cineplex", data);
    },
    getAllCineplexs: () => {
        return axios.pogetst("/api/get-all-cineplex");
    },
};

export default cineplexService;
