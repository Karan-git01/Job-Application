import React, { useState } from "react";
import JobCard from "../common/JobCard";
import AdminJobCard from "./AdminJobCard";

const JobListingPage = ({ jobs, showAction, onDelete }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  if (!jobs) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchLocation = !locationFilter || job.location === locationFilter;

    const matchExperience = !experienceFilter || job.experience === experienceFilter;

    return matchLocation && matchExperience;
  });

  // Unique dropdown values
  const locations = [...new Set(jobs.map((job) => job.location))];
  const experiences = [...new Set(jobs.map((job) => job.experience))];

  if (filteredJobs.length === 0) {
    return <p className="text-center mt-5">No jobs found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Filters */}
      <div className="flex flex-wrap justify-end gap-4 mb-8">

        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="
            px-4 py-2 border rounded-xl shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="">All Locations</option>

          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Experience Filter */}
        <select
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="
            px-4 py-2 border rounded-xl shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="">All Experience</option>

          {experiences.map((exp, index) => (
            <option key={index} value={exp}>
              {exp}
            </option>
          ))}
        </select>
      </div>

      {/* Job Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {filteredJobs.map((job) => (
          <div key={job.id} className="w-full">
            {isAdmin ? (
              <AdminJobCard
                job={job}
                onDelete={onDelete}
              />
            ) : (
              <JobCard
                job={job}
                showAction={showAction}
                onDelete={onDelete}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;