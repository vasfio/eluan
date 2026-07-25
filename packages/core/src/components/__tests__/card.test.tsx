import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";

describe("Card", () => {
  it("renders a composed card with all sections", () => {
    render(
      <Card role="article" aria-label="Plan">
        <CardHeader>
          <CardTitle>Pro plan</CardTitle>
          <CardDescription>Everything you need</CardDescription>
        </CardHeader>
        <CardContent>Body copy</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    const card = screen.getByRole("article", { name: "Plan" });
    expect(card).toBeInTheDocument();
    expect(screen.getByText("Pro plan")).toBeInTheDocument();
    expect(screen.getByText("Everything you need")).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("forwards native props and responds to clicks when clickable", async () => {
    const onClick = vi.fn();
    render(
      <Card clickable role="button" aria-label="Open" onClick={onClick}>
        Interactive
      </Card>
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not forward className overrides", () => {
    render(
      <Card {...({ className: "custom-class" } as never)} role="group">
        Tag
      </Card>
    );
    expect(screen.getByRole("group")).not.toHaveClass("custom-class");
  });
});
