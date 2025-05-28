"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { Button } from "./ui/button";
import DoctorCard from "./doctor-card";

interface DoctorCarouselProps {
  doctors: Array<{
    name: string;
    image: string;
    specialty: string;
    location: string;
    availability: string;
    priceRange: string;
    rating: number;
    verified?: boolean;
  }>;
}

export default function DoctorCarousel({ doctors }: DoctorCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-4 pb-4">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="flex-[0_0_90%] pl-0 sm:flex-[0_0_45%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_23%]"
            >
              <DoctorCard {...doctor} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
