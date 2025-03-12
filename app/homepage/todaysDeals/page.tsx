"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { useCategory } from "../../context/categoryContext";

const TodaysDeals = () => {
  const [todayDeals, setTodayDeals] = useState<any[]>([]);
  const [todayDealsPage, setTodayDealsPage] = useState(0);
  const pageSize = 4;
  const { selectedCategory } = useCategory();

  useEffect(() => {
    const fetchTodayDeals = async () => {
      try {
        let url = `http://localhost:3002/products?section=todays-deals&page=${todayDealsPage}&size=${pageSize}`;

        if (selectedCategory !== "All Categories") {
          const response = await fetch("http://localhost:3002/categories");
          const categories = await response.json();
          const categoryObj = categories.find(
            (cat: any) => cat.name === selectedCategory
          );

          if (categoryObj) {
            url += `&categoryId=${categoryObj.id}`;
          }
        }

        const response = await fetch(url);
        const data = await response.json();
        setTodayDeals(data);
      } catch (error) {
        console.error("Error fetching today's deals:", error);
      }
    };

    fetchTodayDeals();
  }, [todayDealsPage, selectedCategory]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left mt-12 text-black">
        Today's Deals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6" data-testid="deals-grid">
        {todayDeals.map((deal) => {
          const price = deal.price ?? 0;
          const discountPrice = deal.discountPrice ?? 0;

          return (
            <div
              key={deal.id}
              className="relative bg-white shadow-lg rounded-lg p-6 text-center w-full h-[500px] mx-auto transition-transform hover:scale-105 duration-300 mb-4"
            >
              <div className="absolute top-2 right-5 bg-gray-200 rounded-full p-1 shadow cursor-pointer hover:scale-110 transition">
                <FaRegHeart className="w-6 h-6 text-red-500" />
              </div>
              <div className="p-4 h-2/3 flex items-center justify-center">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center mt-6">
                <h2 className="font-semibold text-gray-800 leading-tight truncate text-lg">
                  {deal.name}
                </h2>
                <div className="flex items-center mt-3">
                  <p className="text-gray-400 line-through text-sm mr-2">
                    LKR {price.toFixed(2)}
                  </p>
                  <p className="text-red-500 font-bold text-lg">
                    LKR {discountPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="mt-6 bg-green-700 text-white py-3 px-8 rounded-3xl hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 text-sm md:text-base"
                aria-label="Add to Cart"
                onClick={() => console.log("Add to Cart", deal)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodaysDeals;
