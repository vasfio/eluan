import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer, FooterBrand, FooterLinks, FooterCopyright } from "../footer";

describe("Footer", () => {
  it("renders footer content", () => {
    render(
      <Footer>
        <FooterBrand>Ragnar</FooterBrand>
        <FooterLinks>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </FooterLinks>
        <FooterCopyright>© 2025 Ragnar</FooterCopyright>
      </Footer>
    );
    expect(screen.getByText("Ragnar")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
    expect(screen.getByText("© 2025 Ragnar")).toBeInTheDocument();
  });

  it("renders as footer landmark", () => {
    render(<Footer><FooterCopyright>© 2025</FooterCopyright></Footer>);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
