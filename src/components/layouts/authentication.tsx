"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const authSession = Cookies.get("analogueshifts");
    if (authSession) {
      router.push("/forms");
    }
  }, []);

  return <section className="w-full min-h-screen">{children}</section>;
}
