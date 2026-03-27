import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Testimonial } from "../testimonial";

describe("Testimonial", () => {
  it("renders quote and author", () => {
    render(
      <Testimonial
        author={{ name: "Jane Doe", title: "CEO", company: "Acme Corp" }}
      >
        This product changed my life.
      </Testimonial>
    );
    expect(screen.getByText("This product changed my life.")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("CEO at Acme Corp")).toBeInTheDocument();
  });
});
