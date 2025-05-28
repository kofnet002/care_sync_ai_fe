"use client";

import { Search, UserCheck, CalendarCheck, Video } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search Doctor",
      description: "Find the right doctor based on your medical needs",
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: UserCheck,
      title: "Check Profile",
      description: "View doctor's experience, ratings and reviews",
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: CalendarCheck,
      title: "Book Appointment",
      description: "Select your preferred time slot and book instantly",
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: Video,
      title: "Get Consultation",
      description: "Connect with your doctor online or visit the clinic",
      color: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started with CareSync AI in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative">
                <div
                  className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <step.icon className={`h-8 w-8 ${step.textColor}`} />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(100%-60%)] h-[2px] bg-gray-200">
                    <div className={`h-full w-1/2 ${step.textColor}`} />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
