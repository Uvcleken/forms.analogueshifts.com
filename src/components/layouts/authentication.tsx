"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Group from "@/assets/images/login/group.png";
import Avatar from "@/assets/images/login/avatar.png";

import ApplicationLogo from "@/components/application/application-logo";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const auth = Cookies.get("analogueshifts");
    if (auth) {
      router.push("/forms");
    }
  }, []);

  return (
    <section className="w-full min-h-screen">
      <main className="w-full h-max min-h-screen mx-auto flex justify-center items-center px-5 py-10">
        <section className="max-w-full lg:w-[1000px] md:w-[800px] md:flex-row flex-col flex justify-between items-center">
          <div className="hidden md:flex"></div>
          <div className="w-max h-screen top-0 items-center justify-center fixed hidden md:flex">
            <div className="lg:w-[450px] md:w-[350px] relative flex  justify-center items-center">
              <Image src={Group} alt="" className="absolute" />
              <Image src={Avatar} alt="" />
            </div>
          </div>
          <div className="lg:w-[450px] md:w-[350px] flex flex-col">
            <ApplicationLogo />
            {children}
          </div>
        </section>
      </main>
    </section>
  );
}
