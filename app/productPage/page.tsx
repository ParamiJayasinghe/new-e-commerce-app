"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import AddProductForm from "./addProductForm";  // Import AddProductForm

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);  // State to handle the form visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3002/products?section=featured&page=${featuredPage}&size=4
          `);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [featuredPage]);

  const toggleAddForm = () => {
    setIsAddFormOpen(!isAddFormOpen);
  };

  return (
    <div className="min-h-screen p-8 relative">
      <h1 className="text-4xl font-bold text-center mb-6">Featured Products</h1>

      {/* Add New Product Button */}
      <button
        onClick={toggleAddForm}
        className="absolute top-16 left-8 bg-blue-500 text-white p-4 rounded-lg shadow-lg"
      >
        Add New Product
      </button>

      {/* Conditionally render Add Product Form */}
      {isAddFormOpen && <AddProductForm onClose={toggleAddForm} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center col-span-full">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
