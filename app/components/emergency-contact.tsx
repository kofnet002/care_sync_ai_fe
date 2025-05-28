"use client";

import { Phone, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

export default function EmergencyContact() {
  return (
    <section className="bg-[#3e888c] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">Emergency Contact</h2>
            <p className="text-white/90">
              24/7 Emergency medical assistance available
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              className="bg-white text-[#3e888c] hover:bg-white/90"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: 911
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#3e888c]"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat with Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
