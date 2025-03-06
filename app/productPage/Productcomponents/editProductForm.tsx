"use client";

import React, { useState } from "react";

interface EditProductProps {
  product: any;
  onClose: () => void;
  onEdit: (updatedProduct: any) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onClose, onEdit }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [rating, setRating] = useState(product.rating);
  const [image, setImage] = useState(product.image);

  // Hardcoding the section as "featured"
  const section = "featured";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = { ...product, name, price, rating, image, section };  // include section

    try {
      const response = await fetch(`http://localhost:3002/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        onEdit(updatedProduct);
        onClose();
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
          className="block mb-3 p-3 border w-full"
        />
        <input
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          type="number"
          placeholder="Price"
          required
          className="block mb-3 p-3 border w-full"
        />
        <input
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          type="number"
          max="5"
          min="1"
          placeholder="Rating"
          required
          className="block mb-3 p-3 border w-full"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          required
          className="block mb-3 p-3 border w-full"
        />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" className="ml-2 text-gray-600" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
