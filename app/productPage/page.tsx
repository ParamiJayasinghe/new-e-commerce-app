"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import AddProductForm from "./addProductForm";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredPage, setFeaturedPage] = useState(0);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/products?section=featured&page=${featuredPage}&size=${pageSize}`
        );
        const data = await response.json();

        if (data.length < pageSize) {
          setHasMore(false);
        }

        setProducts((prev) => [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [featuredPage]);

  const toggleAddForm = () => {
    setIsAddFormOpen(!isAddFormOpen);
  };

  const loadMoreProducts = () => {
    if (hasMore) {
      setFeaturedPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen p-8 relative">
      <h1 className="text-4xl font-bold text-center mb-6">Featured Products</h1>

      <button
        onClick={toggleAddForm}
        className="absolute top-16 left-8 bg-blue-500 text-white p-4 rounded-lg shadow-lg"
      >
        Add New Product
      </button>

      {isAddFormOpen && <AddProductForm onClose={toggleAddForm} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">Loading products...</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={loadMoreProducts}
          disabled={!hasMore}
          className={`bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300 ${
            !hasMore ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {hasMore ? "Load More" : "No More Products"}
        </button>
      </div>
    </div>
  );
};

export default Products;
