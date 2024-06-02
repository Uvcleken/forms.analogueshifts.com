"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { fetchVetPosts } from "@/helper-functions/fetch-form";
import { deletePost } from "@/helper-functions/delete-post";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus } from "lucide-react";
import FormGridTile from "./form-grid-tile";
import IdiomProof from "@/components/application/idiom-proof";
import { Button } from "@/components/ui/button";
import FormFallbackLoading from "./fallback-loading";
import { clearUserSession } from "@/helper-functions/clear-user-session";

export default function FormsDashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser]: any = useState(null);
  const [idiomModal, setIdiomModal] = useState(false);
  const pageQuery = useSearchParams().getAll("page");
  const [currentPageInfo, setCurrentPageInfo]: any = useState({});
  const [idToBeDeleted, setIdToBeDeleted]: any = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getVetsUrl, setGetVetsUrl] = useState(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form${
      pageQuery.length ? `?page=${pageQuery[0]}` : ""
    }`
  );

  //Fetch Vets
  const fetchVets = () => {
    setLoading(true);
    // Fetch vet data from your API
    fetchVetPosts(
      getVetsUrl,
      user.token,
      (response) => {
        setCurrentPageInfo(response.data.data.forms);
        setData(response.data.data.forms.data);
        setLoading(false);
      },
      (error: any) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Error fetching forms.",
          description: error.message,
        });
        if (error.response.status === 401) {
          clearUserSession();
        }
      }
    );
  };

  // Delete A Vet by using the Vet Id
  const deleteVet = async () => {
    setLoading(true);
    deletePost(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form/delete/${idToBeDeleted}`,
      user.token,
      () => {
        fetchVets();
        toast({
          variant: "default",
          title: "Form deleted",
          description: "Your form has been deleted successfully",
        });
        setIdToBeDeleted(null);
      },
      (error: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Error deleting form.",
          description: error.message,
        });
        setLoading(false);
        if (error.response.status === 401) {
          clearUserSession();
        }
      }
    );
  };

  useEffect(() => {
    let authSession = Cookies.get("analogueshifts");

    if (!authSession) {
      router.push("/login");
    } else {
      setUser(JSON.parse(authSession));
    }
  }, []);

  // If the user session is active, fetch the users vets
  useEffect(() => {
    if (user) {
      fetchVets();
    }
  }, [user]);

  return (
    <main className="max-w-dashboard mt-3 w-[90%] mx-auto ">
      {loading && (
        <>
          <FormFallbackLoading />
        </>
      )}
      <IdiomProof
        title={"Confirm Delete"}
        label="Delete Form"
        action={() => {
          deleteVet();
          setIdiomModal(false);
        }}
        close={() => {
          setIdToBeDeleted(null);
          setIdiomModal(false);
        }}
        description={
          "Are you sure you want to delete this Vet? This action cannot be undone."
        }
        open={idiomModal}
      />

      <div className="flex w-full justify-between mb-10 items-center gap-2 flex-wrap">
        <div className="">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    currentPageInfo?.prev_page_url
                      ? "/forms" + currentPageInfo?.prev_page_url?.slice(45)
                      : ""
                  }
                />
              </PaginationItem>

              {currentPageInfo?.links &&
                currentPageInfo.links
                  .slice(1, currentPageInfo.links.length - 1)
                  .map((item: any) => {
                    return (
                      <PaginationItem key={crypto.randomUUID()}>
                        <PaginationLink
                          isActive={item.active}
                          href={item.url ? "/forms" + item?.url?.slice(45) : ""}
                        >
                          {item.label}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={
                    currentPageInfo?.next_page_url
                      ? "/forms" + currentPageInfo?.next_page_url?.slice(45)
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex w-max gap-3">
          {/* <Input
            type="search"
            placeholder="Filter forms..."
            className="max-w-sm"
          /> */}
          <Button
            onClick={() => router.push("/forms/create")}
            type="submit"
            className="bg-background-lightYellow flex items-center gap-2 hover:bg-background-lightYellow/80"
          >
            Create Form <Plus width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* Forms */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5">
        {data[0] &&
          data.map((item: any) => {
            return (
              <FormGridTile
                key={crypto.randomUUID()}
                item={item}
                deleteForm={() => {
                  setIdToBeDeleted(item.uuid);
                  setIdiomModal(true);
                }}
              />
            );
          })}
      </div>
    </main>
  );
}
