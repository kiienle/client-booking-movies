import axios from "../axios";

const userService = {
    createNewUserService: (data) => {
        return axios.post("/api/create-new-user", data);
    },
};

export default userService;
