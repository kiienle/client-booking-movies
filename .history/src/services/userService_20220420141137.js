import axios from "../axios";

const userService = {
    createNewUserService: (data) => {
        return axios.post("/api/create-new-user", data);
    },
    getAllUsers: (userId) => {
        return axios.get(`/api/get-all-users?id=${userId}`);
    },
    deleteUserById: (userId) => {
        return axios.delete(`/api/delete-user?id=${userId}`);
    },
};

export default userService;
