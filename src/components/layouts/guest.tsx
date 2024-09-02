"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";

import Cookies from "js-cookie";
import GuestNavigation from "../application/guest-navigation";
import LogoutConfirmation from "../application/logout-confirmation";
import Footer from "../application/footer";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getUser } = useAuth();
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);

  useEffect(() => {
    const token = Cookies.get("analogueshifts");
    if (token) {
      getUser({ setLoading: (loading) => {}, layout: "guest", token });
    }
  }, []);

  return (
    <section className="w-full min-h-screen">
      <LogoutConfirmation
        close={() => setIdiomModalDisplay(false)}
        open={idiomModalDisplay}
      />
      <GuestNavigation
        handleLogout={() => setIdiomModalDisplay(true)}
        user={user}
      />
      {children}
      <Footer />
    </section>
  );
}
