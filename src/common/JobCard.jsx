import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border rounded-lg p-4 m-3 cursor-pointer hover:shadow-md transition"
    >
      {/* 🔝 Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-blue-600">
            {job.title}
          </h2>
          <p className="text-sm text-gray-700 mt-1">
            {job.company}
          </p>
        </div>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
          {job.type}
        </span>
      </div>

      {/* 📍 Location */}
      <p className="text-sm text-gray-500 mt-2">
        {job.location}
      </p>

      {/* 💰 Salary */}
      <p className="text-sm mt-1 text-gray-700 font-medium">
        ₹{job.salaryMin?.toLocaleString()} - ₹{job.salaryMax?.toLocaleString()}
      </p>

      {/* 🧠 Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {job?.skills?.slice(0, 5).map((skill, i) => (
          <span
            key={i}
            className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 🔻 Bottom Info */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>{job.experience}</span>
        <span className="text-blue-600 font-medium">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default JobCard;