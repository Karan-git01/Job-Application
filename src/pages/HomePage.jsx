import React, { useEffect, useState } from "react";
import JobListingPage from "./JobListingPage";
import CompanyList from "../../components/CompanyList";

const API_URL = "http://localhost:3000/jobs";
const COMPANY_API = "http://localhost:3000/companies";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("companies");
  const [companies, setCompanies] = useState(null);
  const [jobs, setJobs] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await fetch(COMPANY_API);
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex justify-center sm:justify-start">
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-1 flex w-full sm:w-fit">
            <button
              onClick={() => setActiveTab("companies")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === "companies"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Top Companies
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === "jobs"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-10">
        {activeTab === "companies" ? (
          companies ? (
            <CompanyList companies={companies} />
          ) : (
            <p className="text-center mt-10 text-gray-500">
              Loading companies...
            </p>
          )
        ) : jobs ? (
          <JobListingPage jobs={jobs} showAction={false} />
        ) : (
          <p className="text-center mt-10 text-gray-500">
            Loading jobs...
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;