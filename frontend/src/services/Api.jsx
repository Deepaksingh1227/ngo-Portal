import axios from "axios";

const API = axios.create({
  baseURL: "https://ngo-portal-7-9p8e.onrender.com/api", withCredentials: true // backend URL
});

// Attach token to requests (if logged in) and prevent caching
API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;

  // Anti-caching headers
  req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  req.headers['Pragma'] = 'no-cache';
  req.headers['Expires'] = '0';

  return req;
});

export default API;
