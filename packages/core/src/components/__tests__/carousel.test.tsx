import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

describe("Carousel", () => {
  const TestCarousel = () => (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );

  it("renders carousel items", () => {
    render(<TestCarousel />);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<TestCarousel />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("removes its embla listeners on unmount (no leak)", () => {
    let api: CarouselApi | undefined;
    const { unmount } = render(
      <Carousel setApi={(a) => (api = a)}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    // Embla initialises synchronously enough in jsdom to hand back an api.
    expect(api).toBeTruthy();
    const offSpy = vi.spyOn(api!, "off");

    unmount();

    // Both listeners added in the effect must be torn down — the `reInit`
    // listener was previously leaked.
    expect(offSpy).toHaveBeenCalledWith("reInit", expect.any(Function));
    expect(offSpy).toHaveBeenCalledWith("select", expect.any(Function));
  });
});
