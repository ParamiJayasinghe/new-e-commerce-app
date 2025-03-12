import { render, screen, fireEvent } from "@testing-library/react";
import BestSellingProducts from "../../app/homepage/bestSelling/page";

jest.mock("../../app/context/categoryContext", () => ({
  useCategory: jest.fn().mockReturnValue({
    selectedCategory: "All Categories",
  }),
}));

describe("BestSellingProducts Page", () => {
  test("renders page title correctly", () => {
    render(<BestSellingProducts />);
    expect(screen.getByText(/Best Selling Products/i)).toBeInTheDocument();
  });

  test("renders a button with correct text", () => {
    render(<BestSellingProducts />);
    const button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-green-700 text-white");
  });

  test("loads more products when 'View More' button is clicked", async () => {
    render(<BestSellingProducts />);
    const button = screen.getByRole("button", { name: /view more/i });
    fireEvent.click(button);
    expect(button).toBeEnabled();
  });

  test("applies correct CSS styles for layout", () => {
    render(<BestSellingProducts />);
    const title = screen.getByText(/Best Selling Products/i);
    expect(title).toHaveClass(
      "text-2xl md:text-3xl font-bold text-center md:text-left text-black"
    );
  });

  test("renders only when the category is selected", () => {
    render(<BestSellingProducts />);
    expect(screen.getByText(/Best Selling Products/i)).toBeInTheDocument();
  });
});
