"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import {
  MdAccountCircle,
  MdNotifications,
  MdFavoriteBorder,
  MdArrowDropDown,
} from "react-icons/md";
import { useCategory } from "../context/categoryContext";

const Header = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const { selectedCategory, setSelectedCategory } = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3002/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="bg-gray-200 py-8">
      <div className="container mx-auto flex items-center justify-between px-12">
        {/* Categories Dropdown Section */}
        <div className="flex items-center space-x-2">
          <select
            className="text-1xl font-semibold text-black bg-gray-200 border-none outline-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <MdArrowDropDown className="text-2xl" />
        </div>

        <Link href="/productPage">
          <button className="text-sm font-bold text-gray-700 hover:bg-gray-200 py-2 px-4 rounded-md bg-gray-100">
            Manage Products
          </button>
        </Link>

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
            <div className="text-sm text-black-500 cursor-pointer">
              Register/Sign In
            </div>
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
