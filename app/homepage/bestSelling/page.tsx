"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../component/product";

const BestSellingProducts = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [bestSellingPage, setBestSellingPage] = useState(0);
  const pageSize = 4;
  const maxProducts = 16; // Stop fetching after 16 products

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/best-selling?page=${bestSellingPage}&size=${pageSize}`
        );
        const data = await response.json();
        setBestSellingProducts((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
      }
    };

    if (bestSellingProducts.length < maxProducts) {
      fetchBestSellingProducts();
    }
  }, [bestSellingPage]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left mt-12 text-black">
        Best Selling Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {bestSellingProducts.length < maxProducts && (
          <button
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            onClick={() => setBestSellingPage((prev) => prev + 1)}
          >
            View more
          </button>
        )}
      </div>
    </div>
  );
};

export default BestSellingProducts;
