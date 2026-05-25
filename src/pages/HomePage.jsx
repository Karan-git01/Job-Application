import React, { useEffect, useState } from "react";
import JobListingPage from "./JobListingPage";
import CompanyList from "../../components/CompanyList";
import TestimonialSection from "../../components/TestimonialSection";

const API_URL = "http://localhost:3000/jobs";
const COMPANY_API = "http://localhost:3000/companies";
const CATEGORY_API = "http://localhost:3000/categories";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("companies");
  const [companies, setCompanies] = useState(null);
  const [jobs, setJobs] = useState(null);

  // carousal
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchCategory();

    const updateSlides = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const maxSlides = category.length - slidesToShow;

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxSlides ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlides]);

  const nextSlide = () => {
    setCurrent((prev) => (prev >= maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? maxSlides : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carousal */}
      <div className="w-full max-w-6xl mx-auto p-5 relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${current * (100 / slidesToShow)}%)`,
            }}
          >
            {category.map((item) => (
              <div
                key={item.id}
                style={{
                  width: `${100 / slidesToShow}%`,
                }}
                className="flex-shrink-0 p-3"
              >
                <div className="h-60 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3">

                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                    {item.icon}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-lg">{item.jobCount} Jobs</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="
            absolute
            top-1/2
            left-0
            -translate-y-1/2
            bg-white
            shadow-lg
            border
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            text-xl
            hover:bg-black
            hover:text-white
            transition-all
            duration-300
            z-10
          "
        >
          ❮
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="
            absolute
            top-1/2
            right-0
            -translate-y-1/2
            bg-white
            shadow-lg
            border
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            text-xl
            hover:bg-black
            hover:text-white
            transition-all
            duration-300
            z-10
          "
        >
          ❯
        </button>
      </div>

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
          <p className="text-center mt-10 text-gray-500">Loading jobs...</p>
        )}
      </div>

      {/* Testimonials */}
      <div>
        <TestimonialSection/>
      </div>
    </div>
  );
};

export default HomePage;
