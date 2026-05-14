import React, { useEffect, useState } from "react";
import AddCompanyPage from "./AddCompanyPage";
import PostJob from "./PostJob";

const API_URL = "http://localhost:3000/jobs";
const COMPANY_API = "http://localhost:3000/companies";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("add_companies");

  const [companies, setCompanies] = useState(null);
  const [jobs, setJobs] = useState(null);

  const fetchJobs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setJobs(data);
        console.log("Jobs:", data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchCompanies = async () => {
      try {
        const res = await fetch(COMPANY_API);
        const data = await res.json();
        setCompanies(data);
        console.log("Companies:", data);
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
      <div className="min-h-screen bg-gray-50">
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <div className="flex justify-center sm:justify-start">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-1 flex w-full sm:w-fit">
              <button
                onClick={() => setActiveTab("add_companies")}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  activeTab === "add_companies"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Add Companies
              </button>

              <button
                onClick={() => setActiveTab("add_jobs")}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  activeTab === "add_jobs"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Add Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === "add_companies" && (
            <AddCompanyPage
              companies={companies}
              setCompanies={setCompanies}
            />
          )}

          {activeTab === "add_jobs" && (
            <PostJob
              jobs={jobs}
              setJobs={setJobs}
              companies={companies}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
