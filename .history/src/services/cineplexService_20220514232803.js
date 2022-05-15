import axios from "../api/axios";

const cineplexService = {
    createNewCineplex: (data) => {
        return axios.post("/api/create-new-cineplex", data);
    },
};

export default cineplexService;
