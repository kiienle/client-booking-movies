import axios from "axios";

const allCodeService = {
    getAllcode: (type) => {
        console.log(type);
        return axios.get(`/api/get-allcode?type=${type}`);
    },
};

export default allCodeService;
