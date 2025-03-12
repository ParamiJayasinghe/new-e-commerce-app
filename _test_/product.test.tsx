import { render, screen } from "@testing-library/react";
import ProductCard from "../app/component/product";
import "@testing-library/jest-dom";

const mockProduct = {
  id: 1,
  name: "Sample Product",
  price: 199.99,
  rating: 4,
  image: "/sample-image.jpg",
};

describe("ProductCard Component", () => {
  it("renders the product name correctly", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it("displays the correct product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(
      screen.getByText(`LKR ${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("shows the product image with correct alt text", () => {
    render(<ProductCard product={mockProduct} />);
    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage).toBeInTheDocument();
  });

  it("ensures the 'Add to Cart' button is present", () => {
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });
});
