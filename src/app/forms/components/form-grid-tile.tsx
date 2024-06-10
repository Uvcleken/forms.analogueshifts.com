"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormTemplateImage from "@/assets/images/form-template.jpg";
import { Share, Eye, EllipsisVertical, Trash, BookOpen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { successToast } from "@/helper-functions/success-toast";
import { errorToast } from "@/helper-functions/error-toast";

interface FormGridTileProps {
  item: any;
  deleteForm: () => void;
}

const FormGridTile: React.FC<FormGridTileProps> = ({ item, deleteForm }) => {
  const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: "",
          url: window.location.href + "/show/" + item.uuid,
        });
      } catch (error) {
        successToast(
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
  };

  return (
    <div className="col-span-1 bg-[#FEFEFE] h-64 rounded-lg border flex flex-col overflow-hidden hover:border-background-lightYellow">
      <Image
        src={FormTemplateImage}
        alt="Form Background"
        className="w-full h-3/4 object-cover"
      />
      <div className="w-full h-1/4 border-t px-3 md:px-5 items-center py-2.5 flex justify-between">
        <div className="w-4/5 flex flex-col justify-between h-full">
          <h3 className="text-primary-boulder950 font-semibold text-sm truncate">
            {item.title}
          </h3>
          <span className="text-xs text-primary-boulder400 truncate">
            Deadline: {item.deadline}
          </span>
        </div>
        <div className="w-max">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="outline-none cursor-pointer border-none hover:bg-background-lightYellow/20 py-2 px-1 rounded-full">
                <EllipsisVertical
                  height={15}
                  className="text-primary-boulder500"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl">
              <DropdownMenuLabel className="text-primary-boulder950 py-3">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => router.push(`/forms/${item.uuid}`)}
                  className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/forms/show/${item.uuid}`)}
                  className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleShare}
                  className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
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
        </div>
      </div>
    </div>
  );
};

export default FormGridTile;
