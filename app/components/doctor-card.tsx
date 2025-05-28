"use client";

import Image from "next/image";
import { Star, MapPin, Clock, DollarSign, Check } from "lucide-react";
import { Button } from "./ui/button";

interface DoctorCardProps {
  name: string;
  image: string;
  specialty: string;
  location: string;
  availability: string;
  priceRange: string;
  rating: number;
  verified?: boolean;
}

export default function DoctorCard({
  name,
  image,
  specialty,
  location,
  availability,
  priceRange,
  rating,
  verified = false,
}: DoctorCardProps) {
  return (
    <div className="bg-white p-4 hover:shadow-md transition-shadow shadow-xl">
      <div className="flex flex-col gap-4">
        {/* Doctor Image */}
        <div className="relative w-full aspect-[4/3] flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {verified && (
            <div className="absolute -top-2 -right-2 bg-[#3e888c] rounded-full p-1">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <h3 className="font-medium text-[#3e888c]">{name}</h3>
          <p className="text-xs text-gray-500 mb-2">{specialty}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </div>

          {/* Availability */}
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <Clock className="h-3 w-3 mr-1" />
            {availability}
          </div>

          {/* Price */}
          <div className="flex items-center text-xs text-gray-500">
            <DollarSign className="h-3 w-3 mr-1" />
            {priceRange}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button variant="outline" className="w-full text-xs rounded-sm">
          View Profile
        </Button>
        <Button className="w-full text-xs rounded-sm">Book Now</Button>
      </div>
    </div>
  );
}
