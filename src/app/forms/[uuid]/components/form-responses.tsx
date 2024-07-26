"use client";
import { useRouter } from "next/navigation";
import { Share, Eye, MoreHorizontal, Trash, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FormResponsesInterface {
  responses: any;
  formUUID: string;
}

const FormResponses: React.FC<FormResponsesInterface> = ({
  responses,
  formUUID,
}) => {
  const router = useRouter();

  return (
    <section className="w-full mx-auto   pt-4">
      <div className="w-full max-w-full py-6  bg-[#FEFEFE] overflow-x-auto rounded-3xl border border-[#E7E7E7]">
        <h3 className="text-primary-boulder950 px-6 text-base font-medium pb-2 w-full">
          {responses.length} responses
        </h3>
        <table className="w-full min-w-[800px] ">
          <tr className="w-full h-11">
            <th className="text-[15px] pl-6 text-primary-boulder900 w-2/5 font-normal text-start ">
              Email
            </th>
            <th className="text-[15px] text-primary-boulder900 w-[35%] font-normal text-start">
              Date
            </th>
            <th className="text-[15px] text-primary-boulder900 w-[15%] font-normal text-start">
              Score
            </th>
            <th className="text-[15px] pr-6 text-primary-boulder900 w-[10%] font-normal text-center">
              Actions
            </th>
          </tr>
          {responses.map((item: any, index: number) => {
            return (
              <tr
                key={item.created_at}
                className={`w-full h-11 ${
                  index % 2 === 0 ? "bg-primary-boulder300/10" : ""
                }`}
              >
                <td className="text-sm pl-6 text-primary-boulder900 w-2/5 font-normal text-start ">
                  {item.email}
                </td>
                <td className="text-sm text-primary-boulder900 w-[35%] font-normal text-start">
                  {item.created_at}
                </td>
                <td className="text-sm text-primary-boulder900 w-[15%] font-normal text-start">
                  {item.score || "Not scored"}
                </td>
                <td className="text-sm text-primary-boulder900 w-[10%] font-normal text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="outline-none w-max h-max cursor-pointer border-none  py-1 px-2 mx-auto rounded-full">
                        <MoreHorizontal
                          width={15}
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
                          onClick={() =>
                            router.push(
                              `/forms/${formUUID}/response/${item.uuid}`
                            )
                          }
                          className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Open Response</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </section>
  );
};

export default FormResponses;
