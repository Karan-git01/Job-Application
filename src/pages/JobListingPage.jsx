import React from "react";
import JobCard from "../common/JobCard";

const JobListingPage = ({ jobs }) => {
  if (!jobs) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center mt-5">No jobs found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-4
      ">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;