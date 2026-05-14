import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCompanyPage = ({ companies, setCompanies }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOIUSceZhRo-Y1RBaOc9lDksAvPGSHe4EYw&s",
    size: "",
    industry: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setCompanies((prevCompanies) => [...prevCompanies, data]);

      setFormData({
        name: "",
        description: "",
        logo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOIUSceZhRo-Y1RBaOc9lDksAvPGSHe4EYw&s",
        size: "",
        industry: "",
        website: "",
      });

      toast.success("Company added successfully!");
    } catch (error) {
      toast.error("Error adding company");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Add New Company
          </h2>

          <p className="text-gray-500 mt-2">
            Fill all details to register a company.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                maxLength={70}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company description"
              />

              <div className="text-right text-sm text-gray-400 mt-1">
                {formData.description.length}/70
              </div>
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Size
                </label>

                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Example: 50-100"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry
                </label>

                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Technology"
                />
              </div>
            </div>

            {/* Website */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website URL
              </label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://company.com"
              />
            </div>

            {/* Logo Preview */}
            {/* <div className="mt-8 flex items-center gap-4 bg-gray-50 border rounded-2xl p-4">
              <img
                src={formData.logo}
                alt="Company Logo"
                className="w-16 h-16 rounded-xl object-cover border"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  Logo Preview
                </h3>

                <p className="text-sm text-gray-500">
                  Default company logo
                </p>
              </div>
            </div> */}

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
            >
              Add Company
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddCompanyPage;