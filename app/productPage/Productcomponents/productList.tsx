"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";

const ProductList: React.FC<{ onEdit: (product: any) => void; onDelete: (product: any) => void }> = ({
  onEdit,
  onDelete,
}) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all([
          fetch("http://localhost:3002/products?section=featured&page=1&size=4"),
          fetch("http://localhost:3002/products?section=todaydeals&page=1&size=4"),
          fetch("http://localhost:3002/products?section=bestselling&page=1&size=4"),
        ]);

        const data = await Promise.all(responses.map((res) => res.json()));
        setProducts([...data[0], ...data[1], ...data[2]]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;
