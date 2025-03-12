import { render, screen, cleanup } from "@testing-library/react";
import ProductCard from "../app/productPage/productCard";
import { within } from "@testing-library/dom";

const mockProduct = {
  name: "Sample Product",
  price: 100.0,
  rating: 4,
  image: "http://example.com/sample-product.jpg",
};

afterEach(() => {
  cleanup();
});

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText(/LKR\s*100/)).toBeInTheDocument();
  });

  it("displays 'Product has been deleted' when productData is null", () => {
    render(<ProductCard product={null} />);

    expect(screen.getByText("Product has been deleted.")).toBeInTheDocument();
  });
});
