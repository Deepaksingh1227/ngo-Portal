import React, { useState } from "react";
import { loginUser } from "../services/Auth";
import { FaEnvelope, FaLock } from "react-icons/fa"; // For icons

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(loginData.email, loginData.password);
      alert(`Welcome ${res.user.name}, role: ${res.user.role}`);
      window.location.href = res.user.role === "admin" ? "/admin" : "/";
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #c8e6c9 100%)", // professional soft pastel gradient
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "20px",
          minHeight: "500px", // slightly increased height for new button
        }}
      >
        <h2 className="text-center mb-5 text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group mb-4">
            <span className="input-group-text bg-primary text-white">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group mb-4">
            <span className="input-group-text bg-primary text-white">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            style={{ padding: "12px", fontSize: "16px" }}
          >
            Login
          </button>

          {/* Register Button */}
          <button
            type="button"
            className="btn btn-outline-primary w-100 mb-3"
            style={{ padding: "12px", fontSize: "16px" }}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>

          <div className="text-center">
            <a href="/forgot-password" className="small text-primary">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
