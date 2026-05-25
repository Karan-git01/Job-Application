// Testimonial.jsx

import React, { useEffect, useState } from "react";

const Testimonial = ({ reviews }) => {
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Responsive Slides
  useEffect(() => {
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

    return () =>
      window.removeEventListener("resize", updateSlides);
  }, []);

  const maxSlide = reviews.length - slidesToShow;

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev >= maxSlide ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [maxSlide]);

  // Next
  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= maxSlide ? 0 : prev + 1
    );
  };

  // Prev
  const prevSlide = () => {
    setCurrent((prev) =>
      prev <= 0 ? maxSlide : prev - 1
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-12 relative mt-10">

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="
          absolute
          left-2
          top-1/2
          -translate-y-1/2
          z-20
          w-10
          h-10
          rounded-full
          bg-white
          shadow-md
          border
          flex
          items-center
          justify-center
          text-xl
          hover:bg-blue-500
          hover:text-white
          transition-all
          duration-300
        "
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          z-20
          w-10
          h-10
          rounded-full
          bg-white
          shadow-md
          border
          flex
          items-center
          justify-center
          text-xl
          hover:bg-blue-500
          hover:text-white
          transition-all
          duration-300
        "
      >
        ❯
      </button>

      {/* Carousel */}
      <div className="overflow-hidden py-8">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${
              current * (100 / slidesToShow)
            }%)`,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                width: `${100 / slidesToShow}%`,
              }}
              className="flex-shrink-0 p-3"
            >
              {/* Card */}
              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  px-6
                  py-5
                  pt-16
                  relative
                  text-center
                  h-full
                "
              >
                {/* Image */}
                <div
                  className="
                    absolute
                    -top-10
                    left-1/2
                    -translate-x-1/2
                  "
                >
                  <div className="relative">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="
                        w-20
                        h-20
                        rounded-full
                        object-cover
                        border-4
                        border-white
                        shadow-md
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-blue-500
                        -z-10
                        translate-x-1.5
                        translate-y-1.5
                      "
                    ></div>
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-lg font-bold text-gray-800">
                  {review.name}
                </h2>

                {/* Job */}
                <p
                  className="
                    text-blue-500
                    uppercase
                    tracking-wider
                    text-xs
                    mt-1
                  "
                >
                  {review.job}
                </p>

                {/* Quote */}
                <div className="text-3xl text-blue-400 mt-3">
                  ❝
                </div>

                {/* Text */}
                <p
                  className="
                    text-gray-500
                    leading-6
                    mt-2
                    text-sm
                  "
                >
                  {review.text}
                </p>

                {/* Bottom Quote */}
                <div className="text-3xl text-blue-400 mt-3">
                  ❞
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;