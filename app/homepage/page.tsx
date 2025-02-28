"use client";  

import { useState, useEffect } from "react";  
import Image from 'next/image'; 
import ProductCard from "../component/product";
import { FaRegHeart, FaStar } from "react-icons/fa"; 
import Footer from "../component/footer";

export default function Home() {
  const [cartItems, setCartItems] = useState<any[]>([]); 
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [todayDeals, setTodayDeals] = useState<any[]>([]);

  const [featuredVisible, setFeaturedVisible] = useState(4);
  const [bestSellingVisible, setBestSellingVisible] = useState(4);

  useEffect(() => {
    // Fetch the products data from the backend
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/api/products');  // Backend API URL
      if (!response.ok) {
        console.error("Failed to fetch data from backend");
        return;
      }
      const data = await response.json();
      setFeaturedProducts(data.featuredProducts);
      setBestSellingProducts(data.bestSellingProducts);
      setTodayDeals(data.todayDeals);
    };

    fetchData();
  }, []);

  const addToCart = (product: any) => {
    setCartItems((prevItems) => [...prevItems, product]); 
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId) 
    );
  };

  const loadMoreFeatured = () => {
    setFeaturedVisible((prev) => prev + 4);
  };

  const loadMoreBestSelling = () => {
    setBestSellingVisible((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      {/* Today's Featured Items Section */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left text-black">
        Today's Featured Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.slice(0, featuredVisible).map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {featuredVisible < featuredProducts.length && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            onClick={loadMoreFeatured}
          >
            View more
          </button>
        </div>
      )}

      {/* Best Selling Products Section */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left mt-12 text-black">
        Best Selling Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellingProducts.slice(0, bestSellingVisible).map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {bestSellingVisible < bestSellingProducts.length && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            onClick={loadMoreBestSelling}
          >
            View more
          </button>
        </div>
      )}

      {/* Today's Deals Section */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left mt-12 text-black">
        Today's Deals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {todayDeals.map((deal) => (
          <div key={deal.id} className="relative bg-white shadow-lg rounded-lg p-6 text-center w-full h-[500px] mx-auto transition-transform hover:scale-105 duration-300 mb-4">
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
              <h2 className="font-semibold text-gray-800 leading-tight truncate text-lg">{deal.name}</h2>
              <div className="flex items-center mt-3">
                <p className="text-gray-400 line-through text-sm mr-2">LKR {deal.originalPrice.toFixed(2)}</p>
                <p className="text-red-500 font-bold text-lg">LKR {deal.discountedPrice.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="mt-6 bg-green-700 text-white py-3 px-8 rounded-3xl hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 text-sm md:text-base"
              onClick={() => addToCart(deal)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
