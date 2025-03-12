import { render, screen, fireEvent } from "@testing-library/react";
import EditButton from "../app/productPage/editButton";

describe("EditButton", () => {
  it("calls onClick when the button is clicked", () => {
    const mockOnClick = jest.fn();

    render(<EditButton onClick={mockOnClick} />);

    fireEvent.click(screen.getByText("Edit"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
