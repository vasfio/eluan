import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FaqAccordion } from "../faq-accordion";

const faqs = [
  { question: "What is Ragnar?", answer: "A design system." },
  { question: "Is it free?", answer: "Yes, open source." },
];

describe("FaqAccordion", () => {
  it("renders all questions", () => {
    render(<FaqAccordion items={faqs} />);
    expect(screen.getByText("What is Ragnar?")).toBeInTheDocument();
    expect(screen.getByText("Is it free?")).toBeInTheDocument();
  });

  it("expands answer on question click", async () => {
    render(<FaqAccordion items={faqs} />);
    await userEvent.click(screen.getByText("What is Ragnar?"));
    expect(screen.getByText("A design system.")).toBeVisible();
  });

  it("collapses on second click", async () => {
    render(<FaqAccordion items={faqs} />);
    await userEvent.click(screen.getByText("What is Ragnar?"));
    await userEvent.click(screen.getByText("What is Ragnar?"));
    expect(screen.queryByText("A design system.")).not.toBeVisible();
  });
});
