"use client";
import {
  LifeBuoy,
  LogOut,
  Mail,
  Plus,
  User,
  UserPlus,
  CheckCircle,
  Phone,
  Share,
  Table,
  XCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileImage from "@/assets/images/profile_avatar.jpg";
import { shareContent } from "@/utils/share-content";

export default function ProfileDropdown({ user, logout }: any) {
  const router = useRouter();

  const share = () => {
    shareContent(
      "AnalogueShifts Vetting System",
      "Build forms and analyze results, with AnalogueShifts Form",
      window.location.origin
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-10 overflow-hidden h-10 rounded-full hover:opacity-70 duration-150 cursor-pointer">
          <Image
            src={ProfileImage}
            alt="Profile Avatar"
            className="w-full h-full scale-150 rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded-2xl">
        <DropdownMenuLabel className="text-primary-boulder950 py-3">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2">
            <User className="mr-2 h-4 w-4" />
            <span>
              {user?.first_name} {user?.last_name && " " + user.last_name}
            </span>
          </DropdownMenuItem>
          {user?.tel && (
            <DropdownMenuItem className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 ">
              <Phone className="mr-2 h-4 w-4" />
              <span>{user?.tel}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 ">
            <Mail className="mr-2 h-4 w-4" />
            <span className="truncate">{user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 ">
            {user?.email_verified_at ? (
              <CheckCircle className="mr-2 h-4 w-4" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            <span>{user?.email_verified_at ? "Verified" : "Un-verified"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 ">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 "
                  onClick={share}
                >
                  <Share className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => router.push("/forms/create")}
            className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 "
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Form</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/forms")}
            className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 "
          >
            <Table className="mr-2 h-4 w-4" />
            <span>My Forms</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2 "
          onClick={() => {
            window.location.href = "https://www.analogueshifts.com/contact";
          }}
        >
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Contact Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 focus:text-red-600 py-2 focus:bg-background-lightYellow/20 "
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
