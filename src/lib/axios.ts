import { baseUrl } from "@/misc/api";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: false, // if you're using cookies/auth
});

export default axiosInstance;
