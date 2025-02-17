import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.217.98:3001/",
  timeout: 12000,
});

export default api;
