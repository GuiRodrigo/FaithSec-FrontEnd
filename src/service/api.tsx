import axios from "axios";

export const IPAdress = "192.168.1.10";

const api = axios.create({
  baseURL: `http://${IPAdress}:3001/`,
  timeout: 12000,
});

export default api;
