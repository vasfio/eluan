import "@eluan/core/styles.css";
import * as React from "react";
import type { ComponentType, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { Banner, EluanProvider, Toast } from "@eluan/core";
import { PROVIDER_RUNS, render, type Mode } from "./fixtures";

// One eval run, rendered on its own page so its provider, fixed banners and
// portals can't leak into the viewer or into the other run.

const runs = import.meta.glob<{ default: ComponentType<any> }>("../../runs/2026-10-30/*.tsx");
const params = new URLSearchParams(window.location.search);
const run = params.get("run") ?? "";
const mode = (params.get("mode") ?? "light") as Mode;

class Boundary extends React.Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <Banner variant="destructive" position="inline" role="alert">
        This run threw while rendering: {this.state.error.message}
      </Banner>
    );
  }
}

function Frame() {
  const [Run, setRun] = React.useState<ComponentType<any> | null>(null);
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    const load = runs[`../../runs/2026-10-30/${run}.tsx`];
    if (!load) return setMissing(true);
    load().then((module) => setRun(() => module.default));
  }, []);

  React.useEffect(() => {
    // Let the viewer size this frame to its content.
    const post = () =>
      window.parent.postMessage({ type: "eval-frame-height", run, mode, height: document.documentElement.scrollHeight }, "*");
    const observer = new ResizeObserver(post);
    observer.observe(document.body);
    post();
    return () => observer.disconnect();
  }, []);

  if (missing) return <Banner variant="destructive" position="inline">No run named {run}.</Banner>;
  if (!Run) return null;
  return <Boundary>{render(run, Run, mode)}</Boundary>;
}

// The theme runs replace the app-root provider, so they render without ours.
// t11-b's provider doesn't take a mode; it reads the persisted one.
const isProvider = PROVIDER_RUNS.has(run);
if (run === "t11-b") {
  try {
    window.localStorage.setItem("eluan:mode", mode);
  } catch {
    // Storage can be blocked; t11-b then follows the OS setting.
  }
}

document.body.style.margin = "0";
document.body.style.padding = "var(--spacing-lg)";
document.body.style.background = "var(--container-bg)";
document.body.style.color = "var(--container-fg)";

createRoot(document.getElementById("root")!).render(
  isProvider ? (
    <>
      <Frame />
      <Toast />
    </>
  ) : (
    <EluanProvider defaultMode={mode} persist={false} followSystemMode={false}>
      <Frame />
      <Toast />
    </EluanProvider>
  ),
);
