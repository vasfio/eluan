import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../sidebar";

describe("Sidebar", () => {
  it("renders sidebar with menu items", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Dashboard</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
