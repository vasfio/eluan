import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-[var(--curves-md)] bg-[var(--container-bg-alt)]", className)}
      {...props}
    />
  )
}

export { Skeleton }
