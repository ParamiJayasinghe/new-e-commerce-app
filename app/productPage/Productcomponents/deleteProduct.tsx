"use client";

import React from "react";

interface DeleteProductProps {
  productId: number;
  onClose: () => void;
  onDelete: (productId: number) => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onClose, onDelete }) => {

  const handleDelete = async () => {
    const section = "featured"; // Hardcoding the section as "featured"

    try {
      const response = await fetch(`http://localhost:3002/products/${productId}?section=${section}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onDelete(productId);  // Notify parent to remove the product from the list
        onClose();  // Close the confirmation modal
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this product?</h2>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="ml-2 text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
