import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import * as stylex from "@stylexjs/stylex"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "./button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          {...props}
          {...stylex.props(styles.root)}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> & {
    /** Fixed viewport size along the scroll axis — required for vertical
     * carousels, where Embla needs a bounded height. */
    viewportHeight?: number | string
  }
>(({ viewportHeight, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      {...stylex.props(
        styles.viewport,
        viewportHeight !== undefined && dynamicStyles.height(viewportHeight)
      )}
    >
      <div
        ref={ref}
        {...props}
        {...stylex.props(
          styles.content,
          orientation === "horizontal" ? styles.contentHorizontal : styles.contentVertical,
          viewportHeight !== undefined && dynamicStyles.height("100%")
        )}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

export type CarouselItemBasis = "full" | "half" | "third"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> & {
    /** Fraction of the viewport each slide occupies. Default "full". */
    basis?: CarouselItemBasis
  }
>(({ basis = "full", ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      {...props}
      {...stylex.props(
        styles.item,
        basisStyles[basis],
        orientation === "horizontal" ? styles.itemHorizontal : styles.itemVertical
      )}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">
>((props, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <span
      {...stylex.props(
        styles.controlWrap,
        orientation === "horizontal" ? styles.previousHorizontal : styles.previousVertical
      )}
    >
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        shape="round"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft aria-hidden="true" {...stylex.props(styles.controlIcon)} />
        <span {...stylex.props(styles.srOnly)}>Previous slide</span>
      </Button>
    </span>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">
>((props, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <span
      {...stylex.props(
        styles.controlWrap,
        orientation === "horizontal" ? styles.nextHorizontal : styles.nextVertical
      )}
    >
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        shape="round"
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight aria-hidden="true" {...stylex.props(styles.controlIcon)} />
        <span {...stylex.props(styles.srOnly)}>Next slide</span>
      </Button>
    </span>
  )
})
CarouselNext.displayName = "CarouselNext"

const controlOffset = "calc((var(--size-xl) + var(--spacing-md)) * -1)"

const styles = stylex.create({
  root: {
    position: "relative",
  },
  viewport: {
    overflow: "hidden",
  },
  content: {
    display: "flex",
  },
  contentHorizontal: {
    marginLeft: "calc(var(--spacing-md) * -1)",
  },
  contentVertical: {
    flexDirection: "column",
    marginTop: "calc(var(--spacing-md) * -1)",
  },
  item: {
    flexBasis: "100%",
    flexGrow: 0,
    flexShrink: 0,
    minWidth: 0,
  },
  itemBasisHalf: {
    flexBasis: "50%",
  },
  itemBasisThird: {
    flexBasis: "33.3333%",
  },
  itemHorizontal: {
    paddingLeft: "var(--spacing-md)",
  },
  itemVertical: {
    paddingTop: "var(--spacing-md)",
  },
  controlWrap: {
    display: "inline-flex",
    position: "absolute",
  },
  previousHorizontal: {
    left: controlOffset,
    top: "50%",
    transform: "translateY(-50%)",
  },
  previousVertical: {
    left: "50%",
    top: controlOffset,
    transform: "translateX(-50%) rotate(90deg)",
  },
  nextHorizontal: {
    right: controlOffset,
    top: "50%",
    transform: "translateY(-50%)",
  },
  nextVertical: {
    bottom: controlOffset,
    left: "50%",
    transform: "translateX(-50%) rotate(90deg)",
  },
  controlIcon: {
    height: "var(--size-xxs)",
    width: "var(--size-xxs)",
  },
  srOnly: {
    borderWidth: 0,
    clip: "rect(0, 0, 0, 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  },
})

const dynamicStyles = stylex.create({
  height: (height: number | string) => ({ height }),
})

const basisStyles = {
  full: null,
  half: styles.itemBasisHalf,
  third: styles.itemBasisThird,
} satisfies Record<CarouselItemBasis, stylex.StyleXStyles | null>


export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
