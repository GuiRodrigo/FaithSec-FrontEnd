import axios from "axios";

export const IPAdress = "10.0.0.147";

const api = axios.create({
  baseURL: `http://${IPAdress}:3001/`,
  timeout: 12000,
});

export default api;
