import { Banner } from "@eluan/core";
import { TriangleAlert } from "lucide-react";

type TrialEndingBannerProps = {
  /** Whole days left in the trial. */
  daysLeft?: number;
};

function formatDays(days: number) {
  return `${days} ${days === 1 ? "day" : "days"}`;
}

export default function TrialEndingBanner({ daysLeft = 3 }: TrialEndingBannerProps) {
  return (
    <Banner
      variant="caution"
      position="top"
      icon={<TriangleAlert size={16} aria-hidden />}
    >
      Your trial ends in {formatDays(daysLeft)}.
    </Banner>
  );
}
