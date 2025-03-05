import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAccountCircle, MdNotifications, MdFavoriteBorder, MdArrowDropDown } from "react-icons/md";

const Header = () => {
  return (
    <header className="bg-gray-200 py-8">
      <div className="container mx-auto flex items-center justify-between px-12">
        
        {/* All Categories Section */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-semibold text-black">All Categories</span>
          <MdArrowDropDown className="text-2xl cursor-pointer" />
        </div>

        {/* Search Bar Section */}
        <div className="flex items-center space-x-6 flex-grow mx-6 text-black">
          <input
            type="text"
            placeholder="Search product"
            className="w-full p-4 rounded-md bg-white shadow-sm text-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <AiOutlineSearch className="text-2xl text-gray-600 absolute right-10 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-6">
          <MdAccountCircle className="text-3xl text-gray-600 cursor-pointer" />
          <div className="text-lg text-gray-700">
            <div>Welcome</div>
            <div className="text-sm text-black-500 cursor-pointer">Register/Sign In</div>
          </div>
          <MdArrowDropDown className="text-2xl cursor-pointer" />
        </div>

        {/* Notification and Heart Icons */}
        <div className="flex items-center space-x-6">
          <MdNotifications className="text-3xl text-gray-600 cursor-pointer" />
          <MdFavoriteBorder className="text-3xl text-gray-600 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
