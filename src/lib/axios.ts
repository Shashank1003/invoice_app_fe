import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://invoice-app-backend-5039.onrender.com/api/v1/",
    withCredentials: false, // if you're using cookies/auth
});

export default axiosInstance;
