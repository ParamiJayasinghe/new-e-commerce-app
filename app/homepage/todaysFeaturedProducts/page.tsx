"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../component/product";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [featuredPage, setFeaturedPage] = useState(0);
  const pageSize = 4;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/featured?page=${featuredPage}&size=${pageSize}`);
        const data = await response.json();
        setFeaturedProducts((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, [featuredPage]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left text-black">
        Today's Featured Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
          onClick={() => setFeaturedPage((prev) => prev + 1)}
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
