import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa"; 
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
import EditProductForm from "./editForm";
import DeleteConfirmationModal from "./deleteModal"; // Import modal

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation
  const [productData, setProductData] = useState<Product | null>(product); // Allow null value for productData

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true); // Show the delete confirmation modal
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3002/products/${product.id}?section=featured`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProductData(null); // Remove product from UI
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleteModalOpen(false); // Close the confirmation modal
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false); // Close the confirmation modal without deleting
  };

  const handleUpdate = (updatedProduct: any) => {
    setProductData(updatedProduct);
  };

  if (!productData) {
    return (
      <div className="relative bg-white shadow-lg rounded-lg p-6 text-center w-full h-[500px] mx-auto transition-transform hover:scale-105 duration-300 mb-4">
        <p className="text-center text-gray-500">Product has been deleted.</p>
      </div>
    );
  }

  const filledStars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`w-4 h-4 ${index < productData.rating ? "text-green-500" : "text-gray-300"}`}
    />
  ));

  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 text-center w-full h-[500px] mx-auto transition-transform hover:scale-105 duration-300 mb-4">
      {/* Image Section */}
      <div className="p-4 h-2/3 flex items-center justify-center">
        <Image
          src={productData.image}
          alt={productData.name}
          width={200}
          height={200}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Name and Price */}
      <div className="flex justify-between items-start mt-6 text-lg md:text-xl">
        <h2 className="font-semibold text-gray-800 leading-tight truncate">{productData.name}</h2>
        <h2 className="text-gray-800 font-bold ml-8 text-lg">LKR {productData.price.toFixed(2)}</h2>
      </div>

      {/* Rating Stars */}
      <div className="flex space-x-1 mt-2">
        {filledStars}
      </div>

      {/* Edit & Delete Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <EditButton onClick={handleEdit} />
        <DeleteButton onClick={handleDeleteClick} />
      </div>

      {/* Display Edit Form Modal */}
      {isEditModalOpen && (
        <EditProductForm
          product={productData}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Display Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProductCard;
