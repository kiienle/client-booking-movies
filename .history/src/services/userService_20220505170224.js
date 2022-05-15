import axios from "../api/axios";

const userService = {
    handleLogin: (email, password) => {
        return axios.post("/api/login", {
            email,
            password,
        });
    },
    createNewUserService: (data) => {
        return axios.post("/api/create-new-user", data);
    },
    getAllUsers: (userId) => {
        return axios.get(`/api/get-all-users?id=${userId}`);
    },
    deleteUserById: (userId) => {
        return axios.delete(`/api/delete-user?id=${userId}`);
    },
    updateUserById: (data) => {
        return axios.put("/api/update-user", data);
    },
};

export default userService;
