"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#15558d] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">CareSync</h2>
            <p className="text-sm text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* For Patients */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">For Patients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Search for Doctors
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/doctor-appointment-booking"
                  className="hover:text-gray-300"
                >
                  Booking
                </Link>
              </li>
              <li>
                <Link href="/patient-dashboard" className="hover:text-gray-300">
                  Patient Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">For Doctors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Appointments
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/doctor-appointment-booking"
                  className="hover:text-gray-300"
                >
                  Doctor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Ghana, Kumasi</li>
              <li>
                <Link href="tel:+233544636910" className="hover:text-gray-300">
                  +233 544 636 910
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:care-sync-ai@gmail.com"
                  className="hover:text-gray-300"
                >
                  care-sync-ai@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            <Link href="#" className="hover:text-gray-300">
              Terms and Conditions
            </Link>
            <span className="mx-2">|</span>
            <Link href="#" className="hover:text-gray-300">
              Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
