"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../component/product";
import { useCategory } from "../../context/categoryContext";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [featuredPage, setFeaturedPage] = useState(0);
  const pageSize = 4;
  const maxProducts = 16;
  const { selectedCategory } = useCategory();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        let url = `http://localhost:3002/products?section=featured&page=${featuredPage}&size=${pageSize}`;

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
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, [featuredPage, selectedCategory]);

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
        {featuredProducts.length < maxProducts && (
          <button
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            onClick={() => setFeaturedPage((prev) => prev + 1)}
          >
            View more
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
