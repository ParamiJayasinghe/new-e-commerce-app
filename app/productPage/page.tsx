"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./Productcomponents/productList";
import AddProductForm from "./Productcomponents/addProductForm";
import EditProduct from "./Productcomponents/editProductForm";
import DeleteProduct from "./Productcomponents/deleteProduct";
import { fetchProducts, addProduct, editProduct, deleteProduct } from "./Productcomponents/productAction";

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const handleAddProduct = async (newProduct: any) => {
    const addedProduct = await addProduct(newProduct);
    if (addedProduct) {
      setProducts([...products, addedProduct]);
    }
    setShowAddForm(false);
  };

  const handleEditProduct = async (updatedProduct: any) => {
    const editedProduct = await editProduct(updatedProduct);
    if (editedProduct) {
      setProducts(products.map((p) => (p.id === editedProduct.id ? editedProduct : p)));
    }
    setShowEditForm(false);
  };

  const handleDeleteProduct = async (id: number) => {
    const section = "featured"; // Section is always 'featured' for the delete action
    const success = await deleteProduct(id, section);
    if (success) {
      setProducts(products.filter((p) => p.id !== id));  // Remove deleted product from the list
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-4xl font-bold text-center mb-6">Explore Our Products</h1>
      <button className="bg-green-500 text-white px-6 py-2 rounded-lg mb-6" onClick={() => setShowAddForm(true)}>
        Add New Product
      </button>

      <ProductList
        products={products}
        onEdit={(product) => {
          setSelectedProduct(product);
          setShowEditForm(true);
        }}
        onDelete={(product) => {
          setSelectedProduct(product);
          setShowDeleteConfirm(true);
        }}
      />

      {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} onAdd={handleAddProduct} />}
      {showEditForm && selectedProduct && (
        <EditProduct product={selectedProduct} onClose={() => setShowEditForm(false)} onEdit={handleEditProduct} />
      )}
      {showDeleteConfirm && selectedProduct && (
        <DeleteProduct
          productId={selectedProduct.id}
          onClose={() => setShowDeleteConfirm(false)}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
