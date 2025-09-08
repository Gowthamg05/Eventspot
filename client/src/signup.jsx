
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    department: "",
    registerNumber: "",
    year: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  // Admin role: check password match without exposing it
  if (formData.role === "admin" && formData.password !== "admin@123") {
    validationErrors.password = "Invalid password for Admin role";
  }

  // Faculty role: check password match without exposing it
  if (formData.role === "faculty" && formData.password !== "faculty123@") {
    validationErrors.password = "Invalid password for Faculty role";
  }

  // Show errors if any
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post("https://eventspot-2.onrender.com/authRoute/save", formData);
    if (response.status === 201) {
      toast.success("🎉 Signup Successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    }
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error("❌ Email already exists.");
    } else {
      toast.error("❌ Signup failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center p-4">
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Create Your Account</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter your name"
            required
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter password"
            required
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm text-gray-600">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            required
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Conditional fields */}
        {formData.role === "faculty" && (
          <div>
            <label className="block text-sm text-gray-600">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Enter department"
            />
          </div>
        )}

        {formData.role === "student" && (
          <>
            <div>
              <label className="block text-sm text-gray-600">Register Number</label>
              <input
                type="text"
                name="registerNumber"
                value={formData.registerNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter register number"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter department"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter year"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </div>

    <ToastContainer position="top-right" autoClose={3000} />
  </div>
);

};

export default Signup;
