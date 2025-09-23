import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCaptcha = (value) => {
    setCaptchaToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ If not admin → must verify captcha
   if (
      !(formData.email === "admin@ngo.com" && formData.password === "Admin123") &&
      !captchaToken
    ) {
      alert("Please verify that you are not a robot!");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", {
        ...formData,
        token: captchaToken, // send captcha only if student/donor
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      alert(`Welcome back, ${data.user.name}`);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* ✅ Show captcha only if not admin */}
        {!(formData.email === "admin@ngo.com") && (
          <div className="mb-3 d-flex justify-content-center">
            <ReCAPTCHA
              sitekey="6LeQkdIrAAAAAKnlClDBShGKWGiUSzD4_9qcS92H"
              onChange={handleCaptcha}
            >
          </ReCAPTCHA></div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
