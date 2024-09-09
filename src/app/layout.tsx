import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";

import { ToastProvider } from "@/contexts/toast";
import ToastMessage from "@/components/application/toast";

import { UserProvider } from "@/contexts/user";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(plusJakartaSans.className)}>
        <UserProvider>
          <ToastProvider>
            <ToastMessage />
            {children}
          </ToastProvider>
        </UserProvider>

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
