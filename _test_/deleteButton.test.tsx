import { render, screen, fireEvent } from "@testing-library/react";
import DeleteButton from "../app/productPage/deleteButton";

describe("DeleteButton", () => {
  it("renders without crashing", () => {
    render(<DeleteButton onClick={jest.fn()} />);

    const buttonElement = screen.getByText("Delete");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn(); // Mock the onClick function
    render(<DeleteButton onClick={mockOnClick} />);

    const buttonElement = screen.getByText("Delete");
    fireEvent.click(buttonElement);

    // Assert that the mock onClick function is called once
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("has the correct styles", () => {
    render(<DeleteButton onClick={jest.fn()} />);

    const buttonElement = screen.getByText("Delete");
    expect(buttonElement).toHaveClass(
      "mt-4 border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 text-sm md:text-base"
    );
  });
});
