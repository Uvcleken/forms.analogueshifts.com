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
import { deletePost } from "@/utils/delete-post";
import { useRouter } from "next/navigation";
import { successToast } from "@/utils/success-toast";
import { errorToast } from "@/utils/error-toast";

export default function FormDetailsDropdown({ user, form, setLoading }: any) {
  const router = useRouter();

  // Delete A Vet by using the Form UUID
  const deleteForm = async () => {
    setLoading(true);
    deletePost(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form/delete/${form.uuid}`,
      user.token,
      () => {
        successToast(
          "Form deleted successfully",

          "Your Form has been deleted successfully"
        );
        router.push("/forms");
      },
      (error: any) => {
        errorToast(
          "Uh oh! Error deleting vet.",
          error?.response?.data?.message ||
            error.message ||
            "Failed To Delete Vet"
        );
        setLoading(false);
        console.log(error);
      }
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
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: form.title,
                    text: "Analogueshifts Forms",
                    url: window.location.origin + "/forms/show/" + form.uuid,
                  });
                } catch (error) {
                  errorToast(
                    "Error sharing content",
                    "There was a problem with your request."
                  );
                }
              } else {
                errorToast(
                  "Sharing not supported on this device.",
                  "There was a problem with your request."
                );
              }
            }}
          >
            <Share className="mr-2 h-4 w-4" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={deleteForm}
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
