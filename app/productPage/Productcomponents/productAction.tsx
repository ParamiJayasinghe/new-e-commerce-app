const API_BASE_URL = "http://localhost:3002/products";

export const fetchProducts = async () => {
  try {
    const sections = ["featured", "todaydeals", "bestselling"];
    const pageSize = 4;

    const responses = await Promise.all(
      sections.map((section) =>
        fetch(`${API_BASE_URL}?section=${section}&page=1&size=${pageSize}`)
      )
    );

    const data = await Promise.all(responses.map((res) => res.json()));
    return [...data[0], ...data[1], ...data[2]];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (newProduct: {
  name: string;
  price: number;
  rating: number;
  image: string;
  section: string;
}) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

export const editProduct = async (updatedProduct: {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  section: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};


export const deleteProduct = async (id: number, section: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}?section=${section}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

