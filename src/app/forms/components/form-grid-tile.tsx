"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormTemplateImage from "@/assets/images/form-template.jpg";
import { Share2, Eye, EllipsisVertical, Trash, BookOpen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shareContent } from "@/utils/share-content";

interface FormGridTileProps {
  item: any;
  deleteForm: () => void;
}

const FormGridTile: React.FC<FormGridTileProps> = ({ item, deleteForm }) => {
  const router = useRouter();

  const handleShare = async () => {
    shareContent(
      item.title || "",
      "",
      window.location.href + "/show/" + item.uuid
    );
  };

  return (
    <div className="form-card mobile:w-[250px] w-full relative  max-w-full bg-[#FEFEFE] h-64 rounded-lg border flex flex-col overflow-hidden hover:border-background-darkYellow">
      <Image
        src={FormTemplateImage}
        alt="Form Background"
        className="w-full h-3/4 object-cover"
      />
      <div className="w-full h-1/4 border-t px-3 md:px-5 items-center py-2.5 flex justify-between">
        <div className="w-full flex flex-col justify-between h-full">
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
              <div className="outline-none duration-300 opacity-0 action-btn absolute top-5 right-3 border bg-white cursor-pointer w-8 h-8 flex justify-center items-center rounded-full">
                <EllipsisVertical
                  height={15}
                  className="text-primary-boulder500 rotate-90"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max  py-2 px-2 rounded-xl">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => router.push(`/forms/${item.uuid}`)}
                  className="text-primary-boulder700 text-[13px] focus:bg-background-darkYellow/10 py-2.5 focus:text-primary-boulder700 px-4 w-40 cursor-pointer"
                >
                  <BookOpen className="mr-2.5 h-4 w-4" />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/forms/show/${item.uuid}`)}
                  className="text-primary-boulder700 text-[13px] focus:bg-background-darkYellow/10 py-2.5 focus:text-primary-boulder700 px-4 w-40 cursor-pointer"
                >
                  <Eye className="mr-2.5 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleShare}
                  className="text-primary-boulder700 text-[13px] focus:bg-background-darkYellow/10 py-2.5 focus:text-primary-boulder700 px-4 w-40 cursor-pointer"
                >
                  <Share2 className="mr-2.5 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={deleteForm}
                  className="text-primary-boulder700 text-[13px] focus:bg-background-darkYellow/10 py-2.5 focus:text-primary-boulder700 px-4 w-40 cursor-pointer"
                >
                  <Trash className="mr-2.5 h-4 w-4" />
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
