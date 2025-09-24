import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api", 
  baseURL: "https://evangadi06.onrender.com/api",
});

export default axiosInstance;