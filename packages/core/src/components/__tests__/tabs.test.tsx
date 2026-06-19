import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

const TestTabs = () => (
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Panel One</TabsContent>
    <TabsContent value="tab2">Panel Two</TabsContent>
  </Tabs>
);

describe("Tabs", () => {
  it("renders tab triggers", () => {
    render(<TestTabs />);
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
  });

  it("shows default tab content", () => {
    render(<TestTabs />);
    expect(screen.getByText("Panel One")).toBeVisible();
  });

  it("switches tab content on click", async () => {
    render(<TestTabs />);
    await userEvent.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByText("Panel Two")).toBeVisible();
  });

  it("marks active tab as selected", async () => {
    render(<TestTabs />);
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab1).toHaveAttribute("data-state", "active");
    await userEvent.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(tab1).toHaveAttribute("data-state", "inactive");
  });

  it("does not forward className overrides to TabsList", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList {...({ className: "custom-list" } as never)}>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A content</TabsContent>
      </Tabs>
    );
    expect(screen.getByRole("tablist")).not.toHaveClass("custom-list");
  });
});
