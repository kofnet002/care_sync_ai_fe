"use client";

import { Search } from "lucide-react";
import WhyChooseUs from "./components/why-choose-us";
import FeaturedServices from "./components/featured-services";
import HowItWorks from "./components/how-it-works";
import Testimonials from "./components/testimonials";
import EmergencyContact from "./components/emergency-contact";
import Image from "next/image";
import Navbar from "./components/navbar";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import DoctorCarousel from "./components/doctor-carousel";
import Footer from "./components/footer";

export default function Home() {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching with:", { location, searchQuery });
    // Add your search logic here
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full bg-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Doctor, Make an Appointment
            </h1>
            <p className="text-lg text-gray-600">
              Discover the best doctors, clinic & hospital the city nearest to
              you.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full pl-10 pr-3 h-12 border border-gray-300 rounded-lg focus:ring-2"
                />
                <div className="absolute text-xs text-gray-500 mt-1 ml-3">
                  Based on your Location
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 h-12 border border-gray-300 rounded-lg focus:ring-2"
                />
                <div className="absolute text-xs text-gray-500 mt-1 ml-3">
                  Ex: Dental or Sugar Check up etc
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="text-white h-12 px-6 w-28"
              >
                <Search className="inline-block mr-2 h-5" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Background Illustration */}
        <div className="">
          <div className="relative w-full">
            <Image
              src="/search-bg.png"
              alt="Medical Background"
              width={1920}
              height={200}
              className="w-full object-cover"
              priority
              style={{ height: "200px" }}
            />
          </div>
        </div>
      </div>

      {/* Clinic and Specialities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Clinic and Specialities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
            {[
              {
                name: "Urology",
                icon: "/specialities/specialities-01.png",
              },
              {
                name: "Neurology",
                icon: "/specialities/specialities-02.png",
              },
              {
                name: "Orthopedic",
                icon: "/specialities/specialities-03.png",
              },
              {
                name: "Cardiologist",
                icon: "/specialities/specialities-04.png",
              },
              {
                name: "Dentist",
                icon: "/specialities/specialities-05.png",
              },
            ].map((specialty, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-2xl transition-transform hover:scale-105"
              >
                <div className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center mb-4 text-cyan-500 shadow-sm">
                  <Image
                    src={specialty.icon}
                    alt={specialty.name}
                    width={40}
                    height={40}
                    className="text-[#3e888c]"
                  />
                  <div className="absolute bottom-0 right-2 text-xs w-6 h-6 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                    {/* <Heart className="w-4 h-4 text-[#3e888c]" /> */}
                    <div className="text-xs bg-[#3e888c] w-3 h-3 rounded-full" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-[#3e888c]">
                  {specialty.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Our Doctor Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="flex mx-auto gap-6 w-full">
          <div className="flex flex-col items-start mb-12 gap-4 w-1/2">
            <div>
              <h2 className="text-4xl font-medium text-gray-900 mb-4">
                Book Our Doctor
              </h2>

              <p className="text-sm text-gray-600 max-w-3xl mb-4">
                Lorem ipsum is simply dummy text. It is a long established fact
                that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum
                is that it has a more-or-less normal distribution of letters.
              </p>
              <p className="text-sm text-gray-600 max-w-3xl ">
                Lorem ipsum is simply dummy text. It is a long established fact
                that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum
                is that it has a more-or-less normal distribution of letters.
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="shrink-0 rounded-sm h-16 w-48"
            >
              Read More
            </Button>
          </div>

          <div className="w-2/3">
            <DoctorCarousel
              doctors={[
                {
                  name: "Linda Tobin",
                  image: "/doctors/doctor-01.jpg",
                  specialty: "General Medicine, MD",
                  location: "Kansas, USA",
                  availability: "Available on Fri, 22 Mar",
                  priceRange: "$50 - $300",
                  rating: 4.5,
                  verified: true,
                },
                {
                  name: "Paul Richard",
                  image: "/doctors/doctor-02.jpg",
                  specialty: "Dermatology & Venereology",
                  location: "California, USA",
                  availability: "Available on Fri, 22 Mar",
                  priceRange: "$100 - $400",
                  rating: 4.8,
                  verified: true,
                },
                {
                  name: "Ruby Perrin",
                  image: "/doctors/doctor-03.jpg",
                  specialty: "Endocrinology & Metabolism",
                  location: "Florida, USA",
                  availability: "Available on Fri, 22 Mar",
                  priceRange: "$200 - $500",
                  rating: 4.7,
                },
                {
                  name: "Darren Elder",
                  image: "/doctors/doctor-04.jpg",
                  specialty: "ENT & Endocrinologist",
                  location: "Newyork, USA",
                  availability: "Available on Fri, 22 Mar",
                  priceRange: "$150 - $250",
                  rating: 4.9,
                  verified: true,
                },
              ]}
            />
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
      <EmergencyContact />
      <Footer />
    </main>
  );
}
