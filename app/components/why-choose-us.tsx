"use client";

import { Award, Clock, Heart, Shield, Users } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Users,
      title: "20+ Years of Experience",
      description: "Dedicated to providing the best healthcare services",
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "Your health data is our top priority",
    },
    {
      icon: Heart,
      title: "Professional Doctors",
      description: "Access to verified and experienced healthcare professionals",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock medical assistance and guidance",
    },
    {
      icon: Award,
      title: "High Quality Care",
      description: "Committed to excellence in healthcare delivery",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose CareSync AI?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience healthcare excellence with our comprehensive medical services
            and dedicated team of professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#3e888c]/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[#3e888c]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
