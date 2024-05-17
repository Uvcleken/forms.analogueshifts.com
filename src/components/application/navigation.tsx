"use client";
import ApplicationLogo from "./application-logo";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-center pt-3 pb-20 px-3">
      <nav className="backdrop-blur-lg   w-full lg:rounded-full fixed z-30">
        {/* Primary Navigation Menu */}
        <div className="w-full mx-auto px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo />
                </Link>
              </div>
            </div>

            {/* Settings Dropdown */}
            <div className="hidden lg:flex lg:items-center lg:ml-6 gap-2">
              <Link
                className="text-sm font-medium py-2 px-7  text-yellow-500 rounded-full border border-yellow-500 duration-300 hover:scale-[1.02]"
                href="#"
              >
                Pricing
              </Link>
              <Link
                className="text-sm font-medium py-2 px-7 duration-300 rounded-full bg-yellow-500 hover:scale-[1.02] text-white hover:ring-1 ring-yellow-500"
                href="/forms"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
