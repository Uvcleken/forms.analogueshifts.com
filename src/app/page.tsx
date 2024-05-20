"use client";
import Link from "next/link";
import GuestLayout from "@/components/layouts/guest";

export default function Home() {
  return (
    <GuestLayout>
      <main className="w-containerWidth max-w-desktop mx-auto pt-80 flex flex-col gap-6 items-center">
        <h1 className="text-primary-boulder950 text-center text-3xl leading-[45px] md:leading-[75px] md:text-[50px] font-semibold">
          Build forms and analyze results, with AnalogueShifts Form
        </h1>
        <p className="text-primary-boulder400 text-xl font-medium text-center">
          Easily create and share online forms and surveys, and analyze
          responses in real-time.
        </p>
        <div className=" flex items-center gap-5 mt-3">
          <Link
            className="text-base font-medium py-3 px-7  text-yellow-500 rounded-full border border-yellow-500 duration-300 hover:scale-[1.02]"
            href="#"
          >
            Pricing
          </Link>

          <Link
            className="text-base font-medium py-3 px-10 duration-300 rounded-full bg-yellow-500 hover:scale-[1.02] text-white hover:ring-1 ring-yellow-500"
            href="/forms"
          >
            Get Started
          </Link>
        </div>
      </main>
    </GuestLayout>
  );
}
