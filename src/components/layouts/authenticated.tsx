"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";

import Cookies from "js-cookie";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import GuestNavigation from "../application/guest-navigation";
import LogoutConfirmation from "../application/logout-confirmation";
import { usePathname } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [idiomModalDisplay, setIdiomModalDisplay] = useState(false);
  const pathname = usePathname();

  const token = Cookies.get("analogueshifts");

  const app = process.env.NEXT_PUBLIC_SITE_BUILD_UUID;

  useEffect((): any => {
    // Redirect To Login if User is not Authenticated
    if (user === null && !token) {
      Cookies.set("RedirectionLink", pathname);
      window.location.href = `https://auth.analogueshifts.app?app=${app}`;
      return null;
    } else if (user === null && token) {
      //    Fetch User
      getUser({ setLoading, layout: "authenticated", token });
    }
  }, []);

  return (
    <section className="w-full min-h-screen">
      {loading && <FormFallbackLoading />}
      <LogoutConfirmation
        close={() => setIdiomModalDisplay(false)}
        open={idiomModalDisplay}
      />
      <GuestNavigation
        user={user}
        handleLogout={() => setIdiomModalDisplay(true)}
      />
      {children}
    </section>
  );
}
