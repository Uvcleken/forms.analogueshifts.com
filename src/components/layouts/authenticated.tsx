"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthenticationNavigation from "../application/authenticated-navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authSession = Cookies.get("analogueshifts");
    if (!authSession) {
      router.push("/login");
    } else {
      setUser(JSON.parse(authSession));
    }
  }, []);

  return (
    <section className="w-full ">
      <AuthenticationNavigation user={user} />
      {children}
    </section>
  );
}
