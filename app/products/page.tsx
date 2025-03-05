"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../component/product"; 

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    rating: 0,
    image: "",
  });

  const [featuredPage, setFeaturedPage] = useState<number>(1);
  const [todayDealsPage, setTodayDealsPage] = useState<number>(1);
  const [bestSellingPage, setBestSellingPage] = useState<number>(1);

  useEffect(() => {
    // Fetching data from the backend URLs for each section
    const fetchProducts = async () => {
      try {
        const [featuredRes, todayDealsRes, bestSellingRes] = await Promise.all([
          fetch(`http://localhost:3001/products?section=featured&page=${featuredPage}&size=4`),
          fetch(`http://localhost:3001/products?section=todaydeals&page=${todayDealsPage}&size=4`),
          fetch(`http://localhost:3001/products?section=bestselling&page=${bestSellingPage}&size=4`),
        ]);

        const featuredProducts = await featuredRes.json();
        const todayDealsProducts = await todayDealsRes.json();
        const bestSellingProducts = await bestSellingRes.json();

        setProducts([
          ...featuredProducts,
          ...todayDealsProducts,
          ...bestSellingProducts,
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [featuredPage, todayDealsPage, bestSellingPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.image || newProduct.price <= 0 || newProduct.rating < 1) {
      alert("Please enter valid product details.");
      return;
    }
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ id: 0, name: "", price: 0, rating: 0, image: "" });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      const updatedName = prompt("Enter new name", productToEdit.name) || productToEdit.name;
      const updatedPrice = parseFloat(prompt("Enter new price", productToEdit.price.toString()) || "0");
      const updatedRating = parseInt(prompt("Enter new rating (1-5)", productToEdit.rating.toString()) || "1", 10);

      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, name: updatedName, price: updatedPrice, rating: updatedRating } : product
        )
      );
    }
  };

  return (
    <div className="bg-white min-h-screen ">
    <div className="container mx-auto py-10 px-12 bg-white min-h-screen">
      {/* <h1 className="text-4xl font-bold text-center text-black mb-8">Explore Our Products</h1>

      {/* Search Bar */}
      {/* <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-md w-1/2"
        />
      </div>  */}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button onClick={() => handleEditProduct(product.id)} className="bg-green-600 text-white px-3 py-1 rounded-md">
                Edit
              </button>
              <button onClick={() => handleDeleteProduct(product.id)} className="bg-green-500 text-white px-3 py-1 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Section */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newProduct.rating}
            onChange={(e) => setNewProduct({ ...newProduct, rating: parseInt(e.target.value) })}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
        >
          Add Product
        </button>
      </div>
    </div>
    </div>
  );
};

export default Products;
