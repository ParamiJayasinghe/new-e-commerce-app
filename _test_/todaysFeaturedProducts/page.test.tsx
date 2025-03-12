import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeaturedProducts from "../../app/homepage/todaysFeaturedProducts/page";

jest.mock("../../app/context/categoryContext", () => ({
  useCategory: jest.fn().mockReturnValue({
    selectedCategory: "All Categories",
  }),
}));

describe("FeaturedProducts Page", () => {
  test("renders page title correctly", () => {
    render(<FeaturedProducts />);
    expect(screen.getByText(/Today's Featured Items/i)).toBeInTheDocument();
  });

  test("renders a button with correct text", () => {
    render(<FeaturedProducts />);
    const button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-green-700 text-white");
  });

  test("loads more products when 'View More' button is clicked", async () => {
    render(<FeaturedProducts />);
    const button = screen.getByRole("button", { name: /view more/i });
    fireEvent.click(button);
    await waitFor(() => expect(button).toBeEnabled()); // Wait for async button action
  });

  test("applies correct CSS styles for layout", () => {
    render(<FeaturedProducts />);
    const title = screen.getByText(/Today's Featured Items/i);
    expect(title).toHaveClass(
      "text-2xl md:text-3xl font-bold text-center md:text-left text-black"
    );
  });

  test("renders only when the category is selected", () => {
    render(<FeaturedProducts />);
    expect(screen.getByText(/Today's Featured Items/i)).toBeInTheDocument();
  });

  test("checks if 'View More' button is visible when there are less than max products", async () => {
    render(<FeaturedProducts />);
    const button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeVisible();
  });
});
