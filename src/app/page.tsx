import GuestLayout from "@/components/layouts/guest";

import Landing from "@/components/application/home/landing";
import DownloadApp from "@/components/application/home/download-app";
import ContactUs from "@/components/application/home/contact-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create online Forms Easily (No Coding Required) - Analogue Shifts",
  description:
    "Simplify your data collection process with our free form builder. Build custom online forms in minutes, streamline workflows, and vet submissions with ease.",
  openGraph: {
    title: "Create online Forms Easily (No Coding Required) - Analogue Shifts",
    description:
      "Simplify your data collection process with our free form builder. Build custom online forms in minutes, streamline workflows, and vet submissions with ease.",
    url: "https://forms.analogueshifts.com",
    siteName: "AnalogueShifts",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://forms.analogueshifts.com",
  },
  verification: {
    google: "wNT1hvWDYGZp2pbVAHsjrug-fDv3T_Z0uxTL_SWBOwc",
  },
};

export default function Home() {
  return (
    <GuestLayout>
      <Landing />
      <ContactUs />
      <DownloadApp />
    </GuestLayout>
  );
}
