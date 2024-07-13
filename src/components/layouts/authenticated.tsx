"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";

import Cookies from "js-cookie";
import AuthenticationNavigation from "../application/authenticated-navigation";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { getUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("analogueshifts");

  useEffect((): any => {
    // Redirect To Login if User is not Authenticated
    if (user === null && !token) {
      window.location.pathname = "/login";
      return null;
    } else if (user === null && token) {
      //    Fetch User
      getUser({ setLoading, layout: "authenticated" });
    }
  }, []);

  return (
    <section
      style={{ background: "rgb(243 244 246/1)" }}
      className="w-full min-h-screen"
    >
      {loading && <FormFallbackLoading />}
      <AuthenticationNavigation user={user} />
      {children}
    </section>
  );
}
