"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import Image from "next/image";

export default function Testimonials() {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "/testimonials/patient-1.jpg",
      rating: 5,
      text: "Amazing experience with CareSync AI! The doctors are professional and caring. The online consultation was smooth and effective.",
      date: "15 March 2024",
    },
    {
      name: "Michael Chen",
      image: "/testimonials/patient-2.jpg",
      rating: 5,
      text: "The ease of booking appointments and the quality of healthcare services is outstanding. Highly recommended!",
      date: "12 March 2024",
    },
    {
      name: "Emily Williams",
      image: "/testimonials/patient-3.jpg",
      rating: 4,
      text: "Great platform for managing healthcare needs. The doctors are knowledgeable and the staff is very helpful.",
      date: "10 March 2024",
    },
    {
      name: "David Martinez",
      image: "/testimonials/patient-4.jpg",
      rating: 5,
      text: "The emergency care service was prompt and professional. CareSync AI has been a lifesaver!",
      date: "8 March 2024",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from our valued patients
          </p>
        </div>

        <div className="relative w-full">
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-4 pb-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{testimonial.text}</p>
                    <p className="text-sm text-gray-400">{testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
      </div>
    </section>
  );
}
