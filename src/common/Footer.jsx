import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-10 text-gray-300 text-left">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div className="flex flex-col md:items-start">
          <h2 className="font-semibold text-lg mb-3 text-white">Job Portal</h2>
          <p className="text-sm text-gray-400">
            Find your dream job or hire the best talent. We connect companies
            with skilled professionals.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col md:items-start">
          <h2 className="font-semibold text-lg mb-3 text-white">Contact</h2>
          <p className="text-sm text-gray-400">West Bengal, India</p>
          <p className="text-sm text-gray-400">support@jobportal.com</p>
          <p className="text-sm text-gray-400">+91 629046****</p>
        </div>

        {/* Social */}
        <div className="flex flex-col md:items-start">
          <h2 className="font-semibold text-lg mb-3 text-white">Follow Us</h2>

          <div className="flex gap-4 mt-2">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-700 py-4">
        © 2026 Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;