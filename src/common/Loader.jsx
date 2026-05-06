import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;