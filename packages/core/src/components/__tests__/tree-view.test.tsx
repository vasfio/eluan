import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TreeView } from "../tree-view";

describe("TreeView", () => {
  const data = [
    {
      id: "1",
      name: "Root",
      children: [
        { id: "1-1", name: "Child 1" },
        { id: "1-2", name: "Child 2" },
      ],
    },
  ];

  it("renders root items", () => {
    render(<TreeView data={data} />);
    expect(screen.getByText("Root")).toBeInTheDocument();
  });

  it("expands children on click", async () => {
    render(<TreeView data={data} />);
    await userEvent.click(screen.getByText("Root"));
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
