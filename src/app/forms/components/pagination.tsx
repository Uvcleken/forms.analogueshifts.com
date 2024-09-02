import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationSection({
  currentPageInfo,
}: {
  currentPageInfo: any;
}) {
  return (
    <Pagination className=" justify-start overflow-x-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:bg-background-darkYellow/10 text-primary-boulder900 text-[13px]"
            href={
              currentPageInfo?.prev_page_url
                ? "/forms" + currentPageInfo?.prev_page_url?.slice(44)
                : ""
            }
          />
        </PaginationItem>

        {currentPageInfo?.links &&
          currentPageInfo.links
            .slice(1, currentPageInfo.links.length - 1)
            .map((item: any) => {
              return (
                <PaginationItem key={item.label} className="">
                  <PaginationLink
                    isActive={item.active}
                    className="rounded-lg  hover:border-background-darkYellow text-[13px] text-primary-boulder900 hover:bg-background-darkYellow/10"
                    href={item.url ? "/forms" + item?.url?.slice(44) : ""}
                  >
                    {item.label}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

        <PaginationItem>
          <PaginationNext
            className="hover:bg-background-darkYellow/10 text-[13px] text-primary-boulder900"
            href={
              currentPageInfo?.next_page_url
                ? "/forms" + currentPageInfo?.next_page_url?.slice(44)
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
