import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";

describe("Breadcrumb", () => {
  it("renders breadcrumb navigation", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("BreadcrumbLink renders as anchor", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">About</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("BreadcrumbPage renders without link", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Settings" })).not.toBeInTheDocument();
  });
});
