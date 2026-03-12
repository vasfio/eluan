import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Testimonial, TestimonialQuote, TestimonialAuthor, TestimonialName, TestimonialTitle } from "../testimonial";

describe("Testimonial", () => {
  it("renders quote and author", () => {
    render(
      <Testimonial>
        <TestimonialQuote>This product changed my life.</TestimonialQuote>
        <TestimonialAuthor>
          <TestimonialName>Jane Doe</TestimonialName>
          <TestimonialTitle>CEO, Acme Corp</TestimonialTitle>
        </TestimonialAuthor>
      </Testimonial>
    );
    expect(screen.getByText("This product changed my life.")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("CEO, Acme Corp")).toBeInTheDocument();
  });
});
