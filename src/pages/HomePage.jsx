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
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2 mt-4">
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-1 flex w-full sm:w-fit">
            <button
              onClick={() => setActiveTab("companies")}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === "companies"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Top Companies
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === "jobs"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Jobs
            </button>
          </div>
        </div>
      </div>
      {activeTab === "companies" ? (
        <div>
          {companies ? (
            <CompanyList companies={companies} />
          ) : (
            <p>Loading companies...</p>
          )}
        </div>
      ) : (
        <div>
          {jobs ? <JobListingPage jobs={jobs} showAction={false}/> : <p>Loading jobs...</p>}
        </div>
      )}
    </div>
  );
};

export default HomePage;
