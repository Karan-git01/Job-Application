import React from "react";
import JobCard from "../common/JobCard";

const JobListingPage = ({ jobs, showAction }) => {
  if (!jobs) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center mt-5">No jobs found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {jobs.map((job) => (
          <div key={job.id} className="w-full">
            <JobCard job={job} showAction={showAction} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;