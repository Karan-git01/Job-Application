import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    number: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must have at least 6 characters");
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        company: formData.company,
        number: formData.number,
      };

      const user = await signup(userData);

      if (user) {
        toast.success("User Created");
        navigate("/login"); // ✅ fixed
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Role */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Role</label>
            <input
              name="role"
              onChange={handleChange}
              placeholder="Jobseeker / Company"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Name */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="number"
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Company */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Company</label>
            <input
              name="company"
              onChange={handleChange}
              placeholder="Company name"
              className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}
          <div className="col-span-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2 transition">
              Create Account
            </button>
          </div>

          {/* Login link */}
          <p className="col-span-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignupPage;
