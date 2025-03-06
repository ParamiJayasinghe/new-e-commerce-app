"use client";

import React from "react";

const AddProductForm: React.FC<{ onClose: () => void; onAdd: (product: any) => void }> = ({
  onClose,
  onAdd,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProduct = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
      rating: parseInt(formData.get("rating") as string, 10),
      image: formData.get("image"),
      section: "featured",
    };

    try {
      const response = await fetch("http://localhost:3002/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        onAdd(await response.json());
        onClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <input name="name" placeholder="Product Name" required className="block mb-3 p-3 border w-full" />
        <input name="price" type="number" placeholder="Price" required className="block mb-3 p-3 border w-full" />
        <input name="rating" type="number" max="5" min="1" placeholder="Rating" required className="block mb-3 p-3 border w-full" />
        <input name="image" placeholder="Image URL" required className="block mb-3 p-3 border w-full" />
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
          <button type="button" className="text-gray-600" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
