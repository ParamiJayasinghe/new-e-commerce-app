import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Products from "../../app/productPage/page";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: "Product 1", price: 100, rating: 4 },
        { id: 2, name: "Product 2", price: 200, rating: 5 },
      ]),
  })
) as jest.Mock;

describe("Products Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page title correctly", () => {
    render(<Products />);
    expect(
      screen.getByRole("heading", { name: "Featured Products" })
    ).toBeInTheDocument();
  });

  it("renders the 'Add New Product' button", () => {
    render(<Products />);
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  it("applies correct CSS classes to main elements", () => {
    render(<Products />);
    expect(screen.getByText("Featured Products")).toHaveClass(
      "text-4xl font-bold text-center"
    );
    expect(screen.getByText("Add New Product")).toHaveClass(
      "bg-blue-500 text-white p-4 rounded-lg shadow-lg"
    );
  });

  it("fetches and displays products", async () => {
    render(<Products />);
    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("loads more products when 'Load More' button is clicked", async () => {
    render(<Products />);
    const loadMoreButton = screen.getByText("Load More");

    fireEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("page=1&size=12")
      );
    });
  });
});
