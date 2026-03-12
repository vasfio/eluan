import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../resizable";

describe("Resizable", () => {
  it("renders panels and handle", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}><div>Left panel</div></ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}><div>Right panel</div></ResizablePanel>
      </ResizablePanelGroup>
    );
    expect(screen.getByText("Left panel")).toBeInTheDocument();
    expect(screen.getByText("Right panel")).toBeInTheDocument();
  });
});
