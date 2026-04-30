import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../accordion";

const TestAccordion = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Section One</AccordionTrigger>
      <AccordionContent>Content One</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Section Two</AccordionTrigger>
      <AccordionContent>Content Two</AccordionContent>
    </AccordionItem>
  </Accordion>
);

describe("Accordion", () => {
  it("renders all trigger buttons", () => {
    render(<TestAccordion />);
    expect(screen.getByRole("button", { name: "Section One" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Section Two" })).toBeInTheDocument();
  });

  // Radix uses `data-state="open" | "closed"` on the trigger to track open
  // state. We assert via this attribute rather than `toBeVisible()`, since
  // happy-dom's CSS visibility computation doesn't reliably reflect Radix's
  // animated open/close transitions.
  it("content is closed initially", () => {
    render(<TestAccordion />);
    expect(screen.getByRole("button", { name: "Section One" })).toHaveAttribute(
      "data-state",
      "closed"
    );
  });

  it("expands content on trigger click", async () => {
    render(<TestAccordion />);
    const trigger = screen.getByRole("button", { name: "Section One" });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("collapses when trigger is clicked again (collapsible)", async () => {
    render(<TestAccordion />);
    const trigger = screen.getByRole("button", { name: "Section One" });
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("only one item open in single mode", async () => {
    render(<TestAccordion />);
    const t1 = screen.getByRole("button", { name: "Section One" });
    const t2 = screen.getByRole("button", { name: "Section Two" });
    await userEvent.click(t1);
    await userEvent.click(t2);
    expect(t1).toHaveAttribute("data-state", "closed");
    expect(t2).toHaveAttribute("data-state", "open");
  });

  it("multiple items open in multiple mode", async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });
    await userEvent.click(a);
    await userEvent.click(b);
    expect(a).toHaveAttribute("data-state", "open");
    expect(b).toHaveAttribute("data-state", "open");
  });
});
