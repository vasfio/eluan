import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../sheet";

describe("Sheet", () => {
  const TestSheet = () => (
    <Sheet>
      <SheetTrigger>Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetHeader>
        <p>Sheet body</p>
      </SheetContent>
    </Sheet>
  );

  it("renders trigger", () => {
    render(<TestSheet />);
    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });

  it("content hidden by default", () => {
    render(<TestSheet />);
    expect(screen.queryByText("Sheet Title")).not.toBeInTheDocument();
  });

  it("shows content on trigger click", async () => {
    render(<TestSheet />);
    await userEvent.click(screen.getByText("Open Sheet"));
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
    expect(screen.getByText("Sheet body")).toBeInTheDocument();
  });
});
