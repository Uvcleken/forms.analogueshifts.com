"use client";
import GuestLayout from "@/components/layouts/guest";

import Landing from "@/components/application/home/landing";
import DownloadApp from "@/components/application/home/download-app";
import ContactUs from "@/components/application/home/contact-us";

export default function Home() {
  return (
    <GuestLayout>
      <Landing />
      <ContactUs />
      <DownloadApp />
    </GuestLayout>
  );
}
