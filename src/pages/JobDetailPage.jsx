import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobDetailPage = () => {
  const API_URL = "http://localhost:3000/jobs";
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setJob(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return (
    <div className="bg-white min-h-screen py-6 px-4">

      {job && (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">

          {/* 🔝 Header */}
          <div className="border-b pb-4">
            <h1 className="text-2xl font-semibold text-blue-600">
              {job.title}
            </h1>
            <p className="text-gray-700 mt-1">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
          </div>

          {/* 💼 Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <p><strong>Salary:</strong> ₹ {job.salaryMin?.toLocaleString()} - ₹ {job.salaryMax?.toLocaleString()}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Type:</strong> {job.type}</p>
          </div>

          {/* 🧾 Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* 🧠 Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 📋 Requirements */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Requirements</h2>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {job.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          {/* 🛠 Responsibilities */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc ml-5 text-sm text-gray-700">
              {job.responsibilities?.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};

export default JobDetailPage;