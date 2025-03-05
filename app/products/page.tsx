"use client";

import React, { useEffect, useState } from "react"; 
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const featuredPage = 1;
  const todayDealsPage = 1;
  const bestSellingPage = 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all([
          fetch(`http://localhost:3001/products?section=featured&page=${featuredPage}&size=4`),
          fetch(`http://localhost:3001/products?section=todaydeals&page=${todayDealsPage}&size=4`),
          fetch(`http://localhost:3001/products?section=bestselling&page=${bestSellingPage}&size=4`),
        ]);

        const data = await Promise.all(responses.map((res) => res.json()));
        const allProducts = [...data[0], ...data[1], ...data[2]];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: e.target.name.value,
      price: parseFloat(e.target.price.value),
      rating: parseInt(e.target.rating.value, 10),
      image: e.target.image.value,
    };
    setProducts([...products, newProduct]);
    setFilteredProducts([...filteredProducts, newProduct]);
    setShowAddForm(false);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editingProduct,
      name: e.target.name.value,
      price: parseFloat(e.target.price.value),
      rating: parseInt(e.target.rating.value, 10),
      image: e.target.image.value,
    };

    const updatedProducts = products.map((p) => (p.id === editingProduct.id ? updatedProduct : p));
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setShowEditForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Explore Our Products</h1>

      <div className="flex justify-between items-center mb-6">
        
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={() => setShowAddForm(true)}
        >
          Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center w-full mx-auto transition-transform hover:scale-105 duration-300"
          >
            <div className="p-4 h-48 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center mt-4 text-lg">
              <h2 className="font-semibold text-gray-800 truncate">{product.name}</h2>
              <h2 className="text-gray-800 font-bold">LKR {product.price.toFixed(2)}</h2>
            </div>

            <div className="flex justify-items-start space-x-1 mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`w-4 h-4 ${
                    index < product.rating ? "text-green-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                onClick={() => {
                  setEditingProduct(product);
                  setShowEditForm(true);
                }}
              >
                Edit
              </button>
              <button
                className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleAddProduct} className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Add Product</h2>
            <input name="name" placeholder="Product Name" required className="block mb-3 p-3 border text-black w-full" />
            <input name="price" type="number" placeholder="Price" required className="block mb-3 p-3 border text-black w-full" />
            <input name="rating" type="number" max="5" min="1" placeholder="Rating" required className="block mb-3 p-3 border text-black w-full" />
            <input name="image" placeholder="Image URL" required className="block mb-3 p-3 border text-black w-full" />
            <div className="flex justify-between">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
              <button type="button" className="ml-2 text-gray-600" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {showEditForm && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleEditProduct} className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Edit Product</h2>
            <input name="name" defaultValue={editingProduct.name} className="block mb-3 p-3 border w-full text-black" />
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button type="button" className="ml-2 text-black" onClick={() => setShowEditForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
