import React, { useState } from "react";
import "../styles/register.css"; // ✅ points to styles folder
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    institute: "",
    department: "",
    state: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.username.trim()) return "Username is required";
    if (!formData.email.includes("@")) return "Enter a valid email";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("🎉 Registration successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
          institute: "",
          department: "",
          state: "",
        });
      } else setError(data.message || "Registration failed");
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input name="password" type="password" placeholder="Password (min 6 chars)" value={formData.password} onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>

        <div className="input-group">
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input name="institute" placeholder="Institute" value={formData.institute} onChange={handleChange} />
        </div>

        <div className="input-group">
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option>Computer Science</option>
            <option>Mechanical</option>
            <option>Electrical</option>
          </select>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? <div className="loader"></div> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;