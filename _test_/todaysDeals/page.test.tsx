import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodaysDeals from "../../app/homepage/todaysDeals/page";

jest.mock("../../app/context/categoryContext", () => ({
  useCategory: jest.fn().mockReturnValue({
    selectedCategory: "All Categories",
  }),
}));

describe("TodaysDeals Page", () => {
  test("renders page title correctly", () => {
    render(<TodaysDeals />);
    expect(screen.getByText(/Today's Deals/i)).toBeInTheDocument();
  });

  test("displays deals in a grid format", async () => {
    render(<TodaysDeals />);
    const gridContainer = screen.getByTestId("deals-grid");
    expect(gridContainer).toBeInTheDocument();
  });

  test("checks responsive layout (grid changes based on screen size)", () => {
    render(<TodaysDeals />);
    const grid = screen.getByTestId("deals-grid");
    expect(grid).toHaveClass(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    );
  });
});
