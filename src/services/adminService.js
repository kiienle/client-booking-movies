import axios from "../api/axios";
import * as queryString from "query-string";

const adminService = {
    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody);
    },
    getAllMovies: () => {
        return axios.get("/api/get-all-movie");
    },
};

export default adminService;
