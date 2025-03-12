import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmationModal from "../app/productPage/deleteModal";

describe("DeleteConfirmationModal", () => {
  it("renders modal with the correct text and buttons", () => {
    render(
      <DeleteConfirmationModal onCancel={jest.fn()} onConfirm={jest.fn()} />
    );

    expect(
      screen.getByText("Are you sure you want to delete this product?")
    ).toBeInTheDocument();

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Yes, Delete")).toBeInTheDocument();
  });

  it("calls the correct function when buttons are clicked", () => {
    const mockOnCancel = jest.fn();
    const mockOnConfirm = jest.fn();

    render(
      <DeleteConfirmationModal
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Yes, Delete"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
