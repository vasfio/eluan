import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Carousel,
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
});
