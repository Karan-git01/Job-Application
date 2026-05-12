import React from "react";
import CompanyCard from "../src/common/CompanyCard";

const CompanyList = ({ companies }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

    </div>
  );
};

export default CompanyList;