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
import { useToast } from "../ui/use-toast";

export default function ProfileDropdown({ user, logout }: any) {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-14 h-14 rounded-full hover:opacity-70 duration-150 cursor-pointer">
          <Image
            src={ProfileImage}
            alt="Profile Avatar"
            className="w-full h-full rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-primary-boulder950">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-primary-boulder700 ">
            <User className="mr-2 h-4 w-4" />
            <span>{user?.name}</span>
          </DropdownMenuItem>
          {user?.tel && (
            <DropdownMenuItem className="text-primary-boulder700 ">
              <Phone className="mr-2 h-4 w-4" />
              <span>{user.tel}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="text-primary-boulder700 ">
            <Mail className="mr-2 h-4 w-4" />
            <span className="truncate">{user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-primary-boulder700 ">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>{user?.email_verified_at ? "Verified" : "Un-verified"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-primary-boulder700 ">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="text-primary-boulder700 "
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: "AnalogueShifts Vetting System",
                          text: "Build forms and analyze results, with AnalogueShifts Form",
                          url: "https://forms.analogueshifts.com",
                        });
                      } catch (error) {
                        toast({
                          variant: "destructive",
                          title: "Error sharing content",
                          description: "There was a problem with your request.",
                        });
                      }
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Sharing not supported on this device.",
                        description: "There was a problem with your request.",
                      });
                    }
                  }}
                >
                  <Share className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => router.push("/forms/create")}
            className="text-primary-boulder700 "
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Form</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/forms")}
            className="text-primary-boulder700 "
          >
            <Table className="mr-2 h-4 w-4" />
            <span>My Forms</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-primary-boulder700 "
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
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
