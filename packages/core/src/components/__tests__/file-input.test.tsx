import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FileInput } from "../file-input";

describe("FileInput", () => {
  it("renders a file input", () => {
    render(<FileInput data-testid="file" />);
    expect(screen.getByTestId("file")).toBeInTheDocument();
  });

  it("renders disabled", () => {
    render(<FileInput disabled data-testid="file" />);
    expect(screen.getByTestId("file")).toBeDisabled();
  });

  it("forwards accept attribute", () => {
    render(<FileInput accept=".pdf,.doc" data-testid="file" />);
    expect(screen.getByTestId("file")).toHaveAttribute("accept", ".pdf,.doc");
  });

  it("forwards multiple attribute", () => {
    render(<FileInput multiple data-testid="file" />);
    expect(screen.getByTestId("file")).toHaveAttribute("multiple");
  });
});
