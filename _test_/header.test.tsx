import { render, screen, waitFor } from "@testing-library/react";
import Header from "../app/component/header";
import { CategoryProvider } from "../app/context/categoryContext";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, name: "Electronics" },
        { id: 2, name: "Fashion" },
      ]),
  })
) as jest.Mock;

describe("Header Component", () => {
  it("displays the categories in the dropdown", async () => {
    render(
      <CategoryProvider>
        <Header />
      </CategoryProvider>
    );

    await waitFor(() => screen.findAllByRole("option"));

    const categoryOptions = screen.getAllByRole("option");

    expect(categoryOptions).toHaveLength(3);
    expect(categoryOptions[1]).toHaveTextContent("Electronics");
    expect(categoryOptions[2]).toHaveTextContent("Fashion");
  });
});
