import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FAQSection, FAQList, FAQItem, FAQQuestion, FAQAnswer } from "../faq-accordion";

describe("FAQSection", () => {
  const TestFAQ = () => (
    <FAQSection>
      <FAQList>
        <FAQItem>
          <FAQQuestion>What is Ragnar?</FAQQuestion>
          <FAQAnswer>A design system.</FAQAnswer>
        </FAQItem>
        <FAQItem>
          <FAQQuestion>Is it free?</FAQQuestion>
          <FAQAnswer>Yes, open source.</FAQAnswer>
        </FAQItem>
      </FAQList>
    </FAQSection>
  );

  it("renders all questions", () => {
    render(<TestFAQ />);
    expect(screen.getByText("What is Ragnar?")).toBeInTheDocument();
    expect(screen.getByText("Is it free?")).toBeInTheDocument();
  });

  it("expands answer on question click", async () => {
    render(<TestFAQ />);
    await userEvent.click(screen.getByText("What is Ragnar?"));
    expect(screen.getByText("A design system.")).toBeVisible();
  });
});
