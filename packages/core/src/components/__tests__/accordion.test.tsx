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

  it("content is hidden initially", () => {
    render(<TestAccordion />);
    expect(screen.queryByText("Content One")).not.toBeVisible();
  });

  it("expands content on trigger click", async () => {
    render(<TestAccordion />);
    await userEvent.click(screen.getByRole("button", { name: "Section One" }));
    expect(screen.getByText("Content One")).toBeVisible();
  });

  it("collapses when trigger is clicked again (collapsible)", async () => {
    render(<TestAccordion />);
    const trigger = screen.getByRole("button", { name: "Section One" });
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(screen.queryByText("Content One")).not.toBeVisible();
  });

  it("only one item open in single mode", async () => {
    render(<TestAccordion />);
    await userEvent.click(screen.getByRole("button", { name: "Section One" }));
    await userEvent.click(screen.getByRole("button", { name: "Section Two" }));
    expect(screen.queryByText("Content One")).not.toBeVisible();
    expect(screen.getByText("Content Two")).toBeVisible();
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
    await userEvent.click(screen.getByRole("button", { name: "A" }));
    await userEvent.click(screen.getByRole("button", { name: "B" }));
    expect(screen.getByText("Content A")).toBeVisible();
    expect(screen.getByText("Content B")).toBeVisible();
  });
});
