import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const JOB_API = "http://localhost:3000/jobs";

const AdminJobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.jobId || job.id}`);
  };

  // Delete Job
  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch(`${JOB_API}/${job.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Job Deleted Successfully");

        // remove from UI instantly
        if (onDelete) {
          onDelete(job.id);
        }
      } else {
        toast.error("Failed to Delete Job");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="h-full w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 text-gray-600">
          <p className="break-words text-sm sm:text-base">
            📍 {job.location}
          </p>

          <p className="font-semibold text-blue-600 text-sm sm:text-base whitespace-nowrap">
            ₹{job.salaryMin?.toLocaleString()} - ₹
            {job.salaryMax?.toLocaleString()}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job?.skills?.slice(0, 5).map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <p className="text-gray-500 text-sm break-words">
            {job.experience}
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/job/${job.jobId || job.id}`);
            }}
          >
            View Details
          </button>
        </div>

        {/* Delete Button */}
        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Delete Job
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default AdminJobCard;