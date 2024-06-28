"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = [
  "/assets/carousel/carousel3.png",
  "/assets/carousel/carousel4.png",
  "/assets/carousel/carousel5.png",
  "/assets/carousel/carousel6.png",
  "/assets/carousel/carousel7.png",
  "/assets/carousel/carousel8.png",
];

const CarouselComponent = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true,stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current,Fade()]}
      className="overflow-hidden"
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full flex-shrink-0">
              <Image
                src={src}
                alt={`carousel image ${index + 1}`}
                width={1500}
                height={1500}
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselComponent;
