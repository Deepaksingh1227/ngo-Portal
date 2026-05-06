import API from "./Api";  // make sure file is named api.js (lowercase)

// 🔑 Login
export const loginUser = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("role", data.user.role);
  sessionStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

// 📝 Register (Student / Donator)
export const registerUser = async (name, email, password, role = "student") => {
  const { data } = await API.post("/auth/register", { name, email, password, role });
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("role", data.user.role);
  sessionStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

// 🚪 Logout
export const logoutUser = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("user");
};

// 🔍 Check login status
export const isLoggedIn = () => {
  return !!sessionStorage.getItem("token");
};

// 🎭 Get current role
export const getUserRole = () => {
  return sessionStorage.getItem("role");
};

// 👤 Get current user info
export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
