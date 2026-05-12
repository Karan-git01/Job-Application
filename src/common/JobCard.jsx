import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const APPLICATION_API = "http://localhost:3000/applications";

const JobCard = ({ job, showAction }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please Login First");
      return;
    }

    const applicationData = {
      jobId: job.id,
      title: job.title,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      userId: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      appliedDate: new Date().toISOString(),
      status: "pending",
    };

    try {
      const response = await fetch(APPLICATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        toast.success("Applied Successfully");
      } else {
        toast.error("Failed to Apply");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const onDelete = () => {};

  return (
    <>
      <div
        onClick={handleClick}
        className="h-full w-full bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between"
      >
        {/* Top Section */}
        <div className="flex justify-between items-start gap-3 mb-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-800 break-words">
              {job.title}
            </h2>

            <p className="text-gray-500 mt-1 break-words">
              {job.company}
            </p>
          </div>

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
            {job.type}
          </span>
        </div>

        {/* Location + Salary */}
        <div className="flex justify-between items-center gap-3 mb-4 text-gray-600 flex-wrap">
          <p className="break-words">📍 {job.location}</p>

          <p className="font-semibold text-blue-600 whitespace-nowrap">
            ₹{job.salaryMin?.toLocaleString()} - ₹
            {job.salaryMax?.toLocaleString()}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {job?.skills?.slice(0, 5).map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <p className="text-gray-500 break-words">
            {job.experience}
          </p>

          <span className="text-blue-600 font-semibold whitespace-nowrap">
            View Details →
          </span>
        </div>

        {/* Buttons */}
        {showAction ? (
          <div className="flex gap-3 mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/job/${job.id}`);
              }}
            >
              View
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(job.id);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={handleApply}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default JobCard;