"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

export type AspectRatioProps = Omit<
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>,
  "className" | "style"
>

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>((props: AspectRatioProps & { className?: string; style?: React.CSSProperties }, ref) => {
  const { className: _className, style: _style, ...ratioProps } = props

  return <AspectRatioPrimitive.Root ref={ref} {...ratioProps} />
})
AspectRatio.displayName = AspectRatioPrimitive.Root.displayName

export { AspectRatio }
