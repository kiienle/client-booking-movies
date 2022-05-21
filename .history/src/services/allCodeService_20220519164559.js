import axios from "axios";

const allCodeService = {
    getAllCode: (type) => {
        console.log(type);
        return axios.get(`/api/get-allcode?type=${type}`);
    },
};

export default allCodeService;
