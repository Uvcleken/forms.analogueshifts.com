"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import {
  Pagination,
  PaginationContent,
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

import { useForms } from "@/hooks/forms";
import { useUser } from "@/contexts/user";

export default function FormsDashboard() {
  const router = useRouter();
  const [idiomModal, setIdiomModal] = useState(false);
  const pageQuery = useSearchParams().getAll("page");
  const [currentPageInfo, setCurrentPageInfo]: any = useState({});
  const [idToBeDeleted, setIdToBeDeleted]: any = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { getForms, deleteForm } = useForms();

  const getVetsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form${
    pageQuery.length ? `?page=${pageQuery[0]}` : ""
  }`;

  const token: any = Cookies.get("analogueshifts");

  //Fetch Vets
  const fetchVets = () => {
    setLoading(true);
    // Fetch vet data from your API
    getForms({ setLoading, url: getVetsUrl, setData, setCurrentPageInfo });
  };

  // Delete A Vet by using the Vet Id
  const deleteVet = async () => {
    try {
      await deleteForm({
        setLoading,
        setForms: setData,
        setCurrentPageInfo,
        getFormsUrl: getVetsUrl,
        id: idToBeDeleted,
      });
      setIdToBeDeleted(null);
    } catch (error) {
      setLoading(false);
    }
  };

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
                      <PaginationItem key={item.label}>
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
          <Button
            onClick={() => router.push("/forms/create")}
            type="submit"
            className="bg-background-lightYellow flex items-center gap-2 hover:bg-background-lightYellow/80"
          >
            Create Vet
            <Plus width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* Forms */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 my-5">
        {data[0] &&
          data.map((item: any) => {
            return (
              <FormGridTile
                key={item.uuid}
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
