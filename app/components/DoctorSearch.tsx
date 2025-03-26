"use client";

import React from "react";
import { Banknote, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { DatePicker } from "@/app/components/DatePicker";
import { toast } from "sonner";
import { doctors } from "../data/doctors";
import { useRouter } from "next/navigation";
interface Doctor {
  id: number;
  name: string;
  title: string;
  specialization: string;
  location: string;
  rating: number;
  reviews: number;
  priceRange: string;
  image: string;
  specializationImage: string;
  services: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const router = useRouter();

  const handleBookAppointment = () => {
    toast.info("Feature coming soon");
  };

  const handleViewProfile = () => {
    router.push(`/doctor-appointment-booking/${doctor.id}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full md:w-48 h-48">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {doctor.name}
            </h3>
            <p className="text-gray-600 text-sm">{doctor.title}</p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Image
              src={doctor.specializationImage}
              alt={doctor.specialization}
              width={20}
              height={20}
            />
            <span className="text-blue-600 text-sm">
              {doctor.specialization}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  size={16}
                  key={i}
                  className={
                    i < Math.floor(doctor.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">({doctor.reviews})</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="text-gray-500" size={16} />
            <span className="text-gray-600">{doctor.location}</span>
          </div>

          <div className="flex items-center gap-1">
            <Banknote className="text-gray-600" size={16} />
            <span className="text-gray-600">{doctor.priceRange}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-2">
          {doctor.services.map((service, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleViewProfile}
            variant="outline"
            className="px-6 py-2 rounded-lg"
          >
            View Profile
          </Button>
          <Button
            onClick={handleBookAppointment}
            className="px-6 py-2 text-white rounded-lg"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

const SearchFilter: React.FC = () => {
  const handleSearch = () => {
    toast.info("Feature coming soon");
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm md:sticky md:top-32">
      <h2 className="text-lg font-semibold mb-4">Search Filter</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <DatePicker />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Gender</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Male Doctor</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2">Female Doctor</span>
            </label>
          </div>
        </div>
        <hr />
        <div>
          <label className="block text-gray-700 mb-2">Select Specialist</label>
          <div className="space-y-2">
            {[
              "Dentist",
              "Cardiology",
              "Brain Surgery",
              "Orthopedic",
              "Urology",
            ].map((specialist) => (
              <label key={specialist} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">{specialist}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full text-white py-5 ">
          Search
        </Button>
      </div>
    </div>
  );
};

const DoctorSearch: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <SearchFilter />
        </div>
        <div className="lg:w-3/4">
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearch;
