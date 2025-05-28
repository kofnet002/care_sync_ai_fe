"use client";

import { Stethoscope, Video, TestTube, Truck, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function FeaturedServices() {
  const services = [
    {
      icon: Stethoscope,
      title: "Emergency Care",
      description: "24/7 emergency medical services with immediate response",
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Video,
      title: "Online Consultation",
      description: "Connect with doctors from the comfort of your home",
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: TestTube,
      title: "Lab Tests & Diagnostics",
      description: "Comprehensive medical tests and health screenings",
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: Truck,
      title: "Medicine Delivery",
      description: "Quick and reliable delivery of prescribed medications",
      color: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Featured Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to meet all your medical needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <service.icon className={`h-6 w-6 ${service.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button
                variant="ghost"
                className={`${service.textColor} hover:${service.color} p-0 h-auto font-semibold`}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
