import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import { themes } from "@eluan/tokens";
import { createTheme } from "../create-theme";
import { EluanProvider, useEluanTheme } from "../eluan-provider";

function ThemeProbe() {
  const { theme, setTheme } = useEluanTheme();

  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("acme")}>acme</button>
      <button onClick={() => setTheme("not-a-theme")}>unknown</button>
    </>
  );
}

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-custom");
});

describe("built-in themes", () => {
  it("ships exactly one built-in theme", () => {
    expect(themes).toEqual(["minimal"]);
  });
});

describe("createTheme", () => {
  it("extends minimal by default", () => {
    const acme = createTheme({ name: "acme", tokens: { "--action-primary-bg": "#4f46e5" } });

    expect(acme.extends).toBe("minimal");
  });

  it("emits a data-theme-custom rule with the given tokens", () => {
    const acme = createTheme({
      name: "acme",
      extends: "minimal",
      tokens: { "--container-bg": "#fafafa", "--font-heading": '"Acme", serif' },
    });

    expect(acme.css).toContain('[data-theme-custom="acme"]');
    expect(acme.css).toContain("--container-bg: #fafafa;");
    expect(acme.css).toContain('--font-heading: "Acme", serif;');
  });

  it("rejects invalid theme names", () => {
    expect(() => createTheme({ name: "9lives", tokens: {} })).toThrow(/invalid theme name/);
  });
});

describe("EluanProvider", () => {
  it("defaults to the minimal theme", () => {
    render(
      <EluanProvider persist={false}>
        <ThemeProbe />
      </EluanProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("minimal");
    expect(document.documentElement).toHaveAttribute("data-theme", "minimal");
  });

  it("activates a custom theme on top of its base theme", async () => {
    const acme = createTheme({ name: "acme", tokens: { "--container-bg": "#fafafa" } });

    render(
      <EluanProvider customThemes={[acme]} persist={false}>
        <ThemeProbe />
      </EluanProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "acme" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("acme");
    expect(document.documentElement).toHaveAttribute("data-theme", "minimal");
    expect(document.documentElement).toHaveAttribute("data-theme-custom", "acme");
  });

  it("ignores unregistered theme names", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <EluanProvider persist={false}>
        <ThemeProbe />
      </EluanProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "unknown" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("minimal");
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("throws when a custom theme name collides with a built-in", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const clash = createTheme({ name: "minimal", tokens: {} });

    expect(() =>
      render(
        <EluanProvider customThemes={[clash]} persist={false}>
          <ThemeProbe />
        </EluanProvider>,
      ),
    ).toThrow(/collides with a built-in theme/);

    error.mockRestore();
  });
});
