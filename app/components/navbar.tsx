import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between w-full border px-1 md:px-5">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="CareSync AI Logo"
          width={100}
          height={100}
        />
        <p className="text-xl font-bold hidden md:flex">CareSync AI</p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Link
          href="/join-us"
          className="border p-2 rounded-md hover:bg-[#3e888c] hover:text-white text-sm transition-all duration-300"
        >
          Login / Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
