import React from "react";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      <div className="grid grid-cols-[80px_1fr] gap-5 items-center">
        
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {company.name}
          </h3>

          <p className="text-gray-600 text-sm mt-1">
            {company.industry}
          </p>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
              {company.size} Employees
            </span>

            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              Hiring
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyCard;