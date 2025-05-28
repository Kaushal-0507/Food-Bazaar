import ContactUs from "../ContactUs";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("contact us component test cases", () => {
  it("should load particular text contact us component", () => {
    render(<ContactUs />);
    const text = screen.getByText("Send Us a Message");

    expect(text).toBeInTheDocument();
  });

  it("should load button in contact us component", () => {
    render(<ContactUs />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
