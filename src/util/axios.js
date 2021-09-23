import axios from "axios";
const beUrl = process.env.REACT_APP_BACKEND_URL + "/api";
const axiosInstance = axios.create({
  baseURL: beUrl,
});
export default axiosInstance;
