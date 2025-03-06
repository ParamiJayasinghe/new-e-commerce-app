"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
  };
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full mx-auto transition-transform hover:scale-105 duration-300">
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
        {Array.from({ length: 5 }, (_, idx) => (
          <FaStar
            key={idx}
            className={`w-4 h-4 ${idx < product.rating ? "text-green-500" : "text-gray-300"}`}
          />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
