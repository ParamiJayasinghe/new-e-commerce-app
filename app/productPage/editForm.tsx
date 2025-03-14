import React, { useState, useEffect } from "react";

interface EditProductFormProps {
  product: any;
  onClose: () => void;
  onUpdate: (updatedProduct: any) => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [rating, setRating] = useState(product.rating);
  const [image, setImage] = useState(product.image);
  const [categoryId, setCategoryId] = useState<number | "">(
    product.categoryId || ""
  );
  const [soldItems, setSoldItems] = useState(product.soldItems || 0);
  const [discountPrice, setDiscountPrice] = useState<string | null>(
    product.discountPrice ? product.discountPrice.toString() : ""
  );
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3002/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price,
      rating,
      image,
      categoryId: categoryId !== "" ? Number(categoryId) : null,
      soldItems,
      discountPrice: discountPrice === "" ? null : parseFloat(discountPrice),
    };

    try {
      const response = await fetch(
        `http://localhost:3002/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        onUpdate(updatedProduct);
        onClose();
      } else {
        console.error("Failed to update product:", responseData);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* New field for soldItems */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="soldItems"
            >
              Sold Items
            </label>
            <input
              id="soldItems"
              type="number"
              value={soldItems}
              onChange={(e) => setSoldItems(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* New field for discountPrice */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="discountPrice"
            >
              Discount Price
            </label>
            <input
              id="discountPrice"
              type="text"
              value={discountPrice || ""}
              onChange={(e) =>
                setDiscountPrice(e.target.value === "" ? null : e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
