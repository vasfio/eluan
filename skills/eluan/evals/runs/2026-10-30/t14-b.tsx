import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Banner, Button } from "@eluan/core";
import { TriangleAlert } from "lucide-react";

// useLayoutEffect warns during server rendering on older React; fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Tracks an element's rendered height. A fixed Banner doesn't reserve space in the
 * layout, and its height changes when the message wraps or density changes, so it
 * has to be measured rather than taken from a token.
 */
function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => setHeight(element.offsetHeight);
    update();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, height] as const;
}

function trialEndsMessage(daysLeft: number): string {
  if (daysLeft <= 0) return "Your trial ends today.";
  return `Your trial ends in ${daysLeft} ${daysLeft === 1 ? "day" : "days"}.`;
}

export type TrialEndingBannerProps = {
  /** Whole days left in the trial. */
  daysLeft?: number;
  /** Where the Upgrade action takes the user. */
  upgradeHref?: string;
};

/**
 * Account-level warning fixed to the top of the viewport. Render it once, at the top
 * of the app shell above the page header; it reserves its own height so it doesn't
 * cover the content beneath it.
 */
export default function TrialEndingBanner({
  daysLeft = 3,
  upgradeHref = "/billing",
}: TrialEndingBannerProps) {
  const [bannerRef, bannerHeight] = useElementHeight<HTMLDivElement>();

  return (
    <>
      <Banner
        ref={bannerRef}
        variant="caution"
        position="top"
        role="status"
        icon={
          <TriangleAlert
            aria-hidden="true"
            style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }}
          />
        }
        action={
          <Button asChild size="sm" variant="outline">
            <a href={upgradeHref}>Upgrade</a>
          </Button>
        }
      >
        {trialEndsMessage(daysLeft)}
      </Banner>
      {/* The fixed Banner sits over the page; this spacer keeps the page below it. */}
      <div aria-hidden="true" style={{ height: bannerHeight }} />
    </>
  );
}
