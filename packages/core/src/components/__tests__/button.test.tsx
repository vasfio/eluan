import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-9");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-11");

    rerender(<Button size="icon">I</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10", "w-10");
  });

  it("renders as child element with asChild", () => {
    render(<Button asChild><a href="/home">Home</a></Button>);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards className", () => {
    render(<Button className="extra-class">Styled</Button>);
    expect(screen.getByRole("button")).toHaveClass("extra-class");
  });
});
