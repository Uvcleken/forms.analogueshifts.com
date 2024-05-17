"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.push("/forms/" + pathname.slice(7, pathname.length - 9));
  }, []);

  return <main></main>;
}
