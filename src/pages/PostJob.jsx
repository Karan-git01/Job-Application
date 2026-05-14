import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJob = ({ jobs, setJobs, companies }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyId: "",
    companyLogo: "",
    location: "",
    type: "",
    workMode: "",
    experience: "",
    salaryMin: "",
    salaryMax: "",
    category: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skills: "",
    companyDescription: "",
    companySize: "",
    postedDate: new Date().toISOString(),
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCompanyChange = (e) => {
    const selectedCompany = companies.find(
      (company) => company.id === e.target.value
    );

    setFormData({
      ...formData,
      company: selectedCompany.name,
      companyId: selectedCompany.id,
      companyLogo: selectedCompany.logo,
      companyDescription: selectedCompany.description,
      companySize: selectedCompany.size,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      ...formData,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),

      requirements: formData.requirements
        .split(",")
        .map((item) => item.trim()),

      responsibilities: formData.responsibilities
        .split(",")
        .map((item) => item.trim()),

      skills: formData.skills
        .split(",")
        .map((item) => item.trim()),
    };

    try {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      const data = await response.json();

      setJobs((prevJobs) => [...prevJobs, data]);

      toast.success("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        companyId: "",
        companyLogo: "",
        location: "",
        type: "",
        workMode: "",
        experience: "",
        salaryMin: "",
        salaryMax: "",
        category: "",
        description: "",
        requirements: "",
        responsibilities: "",
        skills: "",
        companyDescription: "",
        companySize: "",
        postedDate: new Date().toISOString(),
        status: "active",
      });
    } catch (error) {
      toast.error("Error posting job");
      console.log(error);
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          Post New Job
        </h2>

        <p className="text-gray-500 mt-2">
          Fill the details below to create a new job posting.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8"
      >
        {/* Job Title */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Job Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter job title"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Select Company
          </label>

          <select
            onChange={handleCompanyChange}
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Company</option>

            {companies?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter location"
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Job Type
            </label>

            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              placeholder="Full-time / Part-time"
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Work Mode */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Work Mode
            </label>

            <input
              type="text"
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              required
              placeholder="Remote / Hybrid / On-site"
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Experience
            </label>

            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="Junior / Mid / Senior"
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Minimum Salary
            </label>

            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              required
              placeholder="Minimum Salary"
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Maximum Salary
            </label>

            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              required
              placeholder="Maximum Salary"
              className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Technology / Design / Marketing"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Enter job description"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Requirements (comma separated)
          </label>

          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Requirement 1, Requirement 2"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Responsibilities */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Responsibilities (comma separated)
          </label>

          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Responsibility 1, Responsibility 2"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Skills (comma separated)
          </label>

          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={4}
            required
            placeholder="React, Node.js, MongoDB"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
        >
          Post Job
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  </div>
);
};

export default PostJob;