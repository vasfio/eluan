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

function TypesetProbe() {
  const { typeset, setTypeset } = useEluanTheme();

  return (
    <>
      <span data-testid="typeset">{typeset}</span>
      <button onClick={() => setTypeset("large")}>large</button>
      <button onClick={() => setTypeset("auto")}>auto</button>
    </>
  );
}

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-theme-custom");
  document.documentElement.removeAttribute("data-typeset");
  window.localStorage.clear();
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

  it("layers per-mode overrides after the base rule", () => {
    const forest = createTheme({
      name: "forest",
      tokens: { "--action-primary-bg": "#2f6f5e" },
      modes: { dark: { "--action-primary-bg": "#5fa38f" } },
    });

    const base = forest.css.indexOf('[data-theme-custom="forest"] {');
    const dark = forest.css.indexOf('[data-theme-custom="forest"][data-mode="dark"],');
    expect(base).toBe(0);
    expect(dark).toBeGreaterThan(base);
    expect(forest.css).toContain('[data-theme-custom="forest"][data-mode="Dark"] {');
    expect(forest.css.slice(dark)).toContain("--action-primary-bg: #5fa38f;");
    expect(forest.css.slice(0, dark)).toContain("--action-primary-bg: #2f6f5e;");
  });

  it("skips modes with no overrides", () => {
    const forest = createTheme({ name: "forest", tokens: { "--container-bg": "#fafafa" }, modes: { dim: {} } });

    expect(forest.css).not.toContain("data-mode");
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

  it("injects a custom theme's per-mode rules", () => {
    const forest = createTheme({
      name: "forest",
      tokens: { "--container-bg": "#f5f5f5" },
      modes: { dark: { "--container-bg": "#3a3b3a" } },
    });

    render(
      <EluanProvider customThemes={[forest]} defaultTheme="forest" defaultMode="dark" persist={false}>
        <ThemeProbe />
      </EluanProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme-custom", "forest");
    expect(document.documentElement).toHaveAttribute("data-mode", "dark");
    expect(document.getElementById("eluan-custom-themes")?.textContent).toContain(
      '[data-theme-custom="forest"][data-mode="dark"]',
    );
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

describe("typeset axis", () => {
  it("defaults to auto and sets no data-typeset attribute", () => {
    render(
      <EluanProvider persist={false}>
        <TypesetProbe />
      </EluanProvider>,
    );

    expect(screen.getByTestId("typeset")).toHaveTextContent("auto");
    expect(document.documentElement).not.toHaveAttribute("data-typeset");
    expect(window.localStorage.getItem("eluan:typeset")).toBeNull();
  });

  it("pins the attribute and persists an explicit typeset", async () => {
    render(
      <EluanProvider>
        <TypesetProbe />
      </EluanProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "large" }));

    expect(screen.getByTestId("typeset")).toHaveTextContent("large");
    expect(document.documentElement).toHaveAttribute("data-typeset", "large");
    expect(window.localStorage.getItem("eluan:typeset")).toBe("large");
  });

  it("clears both the attribute and storage when set back to auto", async () => {
    render(
      <EluanProvider>
        <TypesetProbe />
      </EluanProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "large" }));
    expect(document.documentElement).toHaveAttribute("data-typeset", "large");

    await userEvent.click(screen.getByRole("button", { name: "auto" }));

    expect(screen.getByTestId("typeset")).toHaveTextContent("auto");
    expect(document.documentElement).not.toHaveAttribute("data-typeset");
    expect(window.localStorage.getItem("eluan:typeset")).toBeNull();
  });

  it("honours defaultTypeset", () => {
    render(
      <EluanProvider defaultTypeset="small" persist={false}>
        <TypesetProbe />
      </EluanProvider>,
    );

    expect(screen.getByTestId("typeset")).toHaveTextContent("small");
    expect(document.documentElement).toHaveAttribute("data-typeset", "small");
  });

  it("restores a persisted pin over defaultTypeset", () => {
    window.localStorage.setItem("eluan:typeset", "medium");

    render(
      <EluanProvider defaultTypeset="auto">
        <TypesetProbe />
      </EluanProvider>,
    );

    expect(screen.getByTestId("typeset")).toHaveTextContent("medium");
    expect(document.documentElement).toHaveAttribute("data-typeset", "medium");
  });
});
