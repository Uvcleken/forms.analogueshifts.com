"use client";
import { LayoutGrid } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function AppsDropdown() {
  const apps = [
    {
      title: "Payment",
      url: "https://pay.analogueshifts.com",
    },
    {
      title: "Vetting",
      url: "https://form.analogueshifts.com",
    },
    {
      title: "Resume",
      url: "https://resume.analogueshifts.com",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent hover:bg-primary-boulder300/30 duration-150 cursor-pointer">
          <LayoutGrid width={20} height={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-w-[95%] rounded-2xl">
        <DropdownMenuLabel className="text-primary-boulder950">
          Our Apps
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="w-full grid grid-cols-3 p-4">
          {apps.map((item) => {
            return (
              <DropdownMenuItem
                onClick={() => {
                  window.location.href = item.url;
                }}
                key={item.title}
                className="col-span-1 rounded-xl cursor-pointer h-max p-3 flex flex-col items-center gap-2.5"
              >
                <Image
                  src={"/logo.png"}
                  className="max-w-[80%]"
                  alt="Logo"
                  width={35}
                  height={35}
                />
                <span className="text-primary-boulder950 text-xs">
                  {item.title}
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
