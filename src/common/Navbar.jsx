import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className='bg-white sticky top-0 z-50 border-b shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        
        <div className='flex justify-between items-center h-16'>

          {/* 🔵 Logo */}
          <Link 
            to="/home" 
            className='flex items-center gap-2 text-lg sm:text-xl font-semibold text-blue-600'
          >
            <FaBriefcase />
            <span>JobPortal</span>
          </Link>

          {/* 🔗 Nav Links (NOW visible on mobile too) */}
          <div className='flex items-center gap-4 sm:gap-6'>
            <Link 
              to="/company/dashboard" 
              className='text-gray-600 hover:text-blue-600 font-medium text-sm sm:text-base transition'
            >
              Find Jobs
            </Link>
          </div>

          {/* 👤 Right Section */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {user ? (
              <>
                {/* Hide name on very small screens */}
                <span className='text-gray-700 font-medium hidden sm:block'>
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm transition'
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className='flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-blue-600 transition'
              >
                <FaUser />
                <span className='hidden sm:block text-sm font-medium'>
                  Sign In
                </span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;