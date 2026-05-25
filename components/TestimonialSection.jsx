import React from "react";
import Testimonial from "./Testimonial";
import testimonials from "../src/testimonials";


const TestimonialSection = () => {
  return (
    <div className="bg-gray-50 py-2">

      {/* Heading */}
      <div className="text-center mb-10">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What Our Users Say
        </h2>

        <div className="w-28 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></div>

        <p className="text-gray-500 mt-4 text-sm md:text-base">
          Success stories from job seekers
        </p>
      </div>

      {/* Testimonial Carousel */}
      <Testimonial reviews={testimonials} />
    </div>
  );
};

export default TestimonialSection;