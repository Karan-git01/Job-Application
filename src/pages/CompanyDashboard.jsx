import React, { useEffect, useState } from "react";
import JobListingPage from "./JobListingPage";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/applications";

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const filteredData = data?.filter((job)=> job?.userId === user?.id);

      setJobs(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  
  const onDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Application deleted successfully");

        fetchData();
      } else {
        toast.error("Failed to delete application");
      }
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Company Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage Applications
          </p>
        </div>

        {/* Jobs */}
        <JobListingPage
          jobs={jobs}
          showAction={true}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default CompanyDashboard;