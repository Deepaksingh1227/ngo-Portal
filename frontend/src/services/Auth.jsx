import API from "./Api";  // make sure file is named api.js (lowercase)

// 🔑 Login
export const loginUser = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

// 📝 Register (Student / Donator)
export const registerUser = async (name, email, password, role = "student") => {
  const { data } = await API.post("/auth/register", { name, email, password, role });
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

// 🚪 Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};

// 🔍 Check login status
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// 🎭 Get current role
export const getUserRole = () => {
  return localStorage.getItem("role");
};

// 👤 Get current user info
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
