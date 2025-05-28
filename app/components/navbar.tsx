"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="CareSync AI Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="text-lg md:text-xl font-bold text-[#3e888c] hidden md:block">
            CareSync AI
          </p>
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/join-us"
            className="border border-[#3e888c] text-[#3e888c] hover:bg-[#3e888c] hover:text-white transition-all duration-300 px-4 py-2 rounded-md text-sm"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
