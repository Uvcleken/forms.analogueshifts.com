import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "@/contexts/user";

const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap" });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className)}>
        <UserProvider>{children}</UserProvider>
        <ToastContainer position="top-center" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FTVY2HD14L"
        />

        <Script id="my-script">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FTVY2HD14L');
            `}</Script>
        <Script src="https://kit.fontawesome.com/39a80cd06c.js" />
      </body>
    </html>
  );
}
