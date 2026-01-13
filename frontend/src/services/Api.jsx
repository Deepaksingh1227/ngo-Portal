import axios from "axios";

const API = axios.create({
  baseURL: "https://ngo-portal-6-guis.onrender.com/api", withCredentials:true // backend URL
});

// Attach token to requests (if logged in)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
