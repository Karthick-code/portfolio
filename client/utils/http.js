import axios from "axios";

const api=import.meta.env.VITE_API_URL;
const http = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: api,
 
});
export default http;


