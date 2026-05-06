import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const API_URL = "http://localhost:3000"

const LoginPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      const user = data.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login Successful");
        navigate("/home");
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>

      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>

        {/* 🔵 Heading */}
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Login to your account
        </h2>

        {/* 📄 Form */}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className='text-sm text-gray-600'>Email</label>
            <input
              type='email'
              name="email"
              placeholder='Enter your email'
              className='w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className='text-sm text-gray-600'>Password</label>
            <input
              type='password'
              name="password"
              placeholder='Enter your password'
              className='w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <button
            className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-2 transition'
          >
            Login
          </button>

          {/* Signup Link */}
          <p className='text-center text-sm text-gray-600 mt-2'>
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>

        </form>
      </div>

      <ToastContainer />
    </div>
  )
}

export default LoginPage;