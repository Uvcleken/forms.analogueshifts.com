"use client";
import { Share, Eye, EllipsisVertical, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { useForms } from "@/hooks/forms";
import { shareContent } from "@/utils/share-content";

export default function FormDetailsDropdown({ form, setLoading }: any) {
  const router = useRouter();

  const { deleteForm } = useForms();

  // Delete A Vet by using the Form UUID
  const deletePost = async () => {
    deleteForm({ id: form.uuid, setLoading, getFormsUrl: null });
  };

  const share = () => {
    shareContent(
      form.title || "",
      "Analogueshifts Forms",
      window.location.origin + "/forms/show/" + form.uuid
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent hover:bg-background-lightYellow/20 duration-150 cursor-pointer">
          <EllipsisVertical width={20} height={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-2xl">
        <DropdownMenuLabel className="text-primary-boulder950 py-3">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/forms/show/" + form.uuid)}
            className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>Preview</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
            onClick={share}
          >
            <Share className="mr-2 h-4 w-4" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={deletePost}
            className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
