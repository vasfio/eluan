import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero, HeroTitle, HeroDescription, HeroActions } from "../hero";

describe("Hero", () => {
  it("renders title and description", () => {
    render(
      <Hero>
        <HeroTitle>Build faster</HeroTitle>
        <HeroDescription>The design system for everyone.</HeroDescription>
        <HeroActions>
          <a href="/docs">Get started</a>
        </HeroActions>
      </Hero>
    );
    expect(screen.getByText("Build faster")).toBeInTheDocument();
    expect(screen.getByText("The design system for everyone.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get started" })).toBeInTheDocument();
  });

  it("forwards className to hero root", () => {
    const { container } = render(
      <Hero className="bg-blue-900">
        <HeroTitle>Title</HeroTitle>
      </Hero>
    );
    expect(container.firstChild).toHaveClass("bg-blue-900");
  });
});
