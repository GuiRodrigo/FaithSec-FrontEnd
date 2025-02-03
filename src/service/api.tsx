import axios from "axios"

const API_URL = "http://172.20.10.13:3000/"

const api = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 12000
});

export default api;