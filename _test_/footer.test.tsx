import { render, screen } from "@testing-library/react";
import Footer from "../app/component/footer";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Footer Component", () => {
  test("renders the Quick Links section with correct links", () => {
    render(<Footer />);

    const quickLinks = ["Home", "About Us", "Careers"];

    quickLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test("renders the Contact Us section with input and send button", async () => {
    render(<Footer />);

    const emailInput = screen.getByPlaceholderText("Your email address");
    expect(emailInput).toBeInTheDocument();

    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeInTheDocument();

    await userEvent.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");
  });
});
