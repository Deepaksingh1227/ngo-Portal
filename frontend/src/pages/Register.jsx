import React, { useState, useEffect } from "react";
import API from "../services/Api";
import ReCAPTCHA from "react-google-recaptcha";
import AOS from "aos";
import "aos/dist/aos.css";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ store actual CAPTCHA token value (not boolean)
  const handleCaptcha = (value) => {
    setCaptchaToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken && formData.role !== "admin") {
      alert("Please verify that you are not a robot!");
      return;
    }
    setIsLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        ...formData,
        token: captchaToken, // ✅ send real token to backend
      });

      alert(`User registered: ${data.user.name}`);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.user.role);
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center">Register</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="student">Student</option>
          </select>
        </div>

        {/* ✅ reCAPTCHA */}
        {formData.role !== "admin" && (
          <div className="mb-3 d-flex justify-content-center">
            <ReCAPTCHA
              sitekey="6Lfgj0ksAAAAAJ4mGykeKyUX3mccL1T8O12j8Beg"
              onChange={handleCaptcha}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!captchaToken && formData.role !== "admin"}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
