import Image from "next/image";
import FormTemplateImage from "@/assets/images/form-template.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface FormGridTileProps {
  item: any;
  deleteForm: () => void;
}

const FormGridTile: React.FC<FormGridTileProps> = ({ item, deleteForm }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: "",
          url: "https://forms.analogueshifts.com/form/show/" + item.uuid,
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
  };

  return (
    <div className="col-span-1 h-64 rounded-lg border flex flex-col overflow-hidden hover:border-background-lightYellow">
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
          <Popover>
            <PopoverTrigger asChild>
              <button className="outline-none border-none hover:bg-primary-boulder300/10 py-2 px-1 rounded-full">
                <EllipsisVertical
                  height={15}
                  className="text-primary-boulder500"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="grid">
                <div>
                  <h4 className="font-medium leading-none text-primary-boulder950 text-[15px] pb-2">
                    Actions
                  </h4>
                </div>
                <Link
                  href={`/forms/${item.uuid}`}
                  className="text-sm p-2 text-muted-foreground hover:bg-primary-boulder300/10"
                >
                  Open
                </Link>
                <Link
                  href=""
                  className="text-sm p-2 text-muted-foreground hover:bg-primary-boulder300/10"
                >
                  Preview
                </Link>
                <button
                  onClick={handleShare}
                  className="text-sm p-2 text-muted-foreground hover:bg-primary-boulder300/10 text-start"
                >
                  Share
                </button>
                <button
                  onClick={deleteForm}
                  className="text-sm p-2 text-muted-foreground hover:bg-primary-boulder300/10 text-start"
                >
                  Delete
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FormGridTile;
