"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import FormGridTile from "./form-grid-tile";
import IdiomProof from "@/components/application/idiom-proof";
import FormFallbackLoading from "./fallback-loading";

import { useForms } from "@/hooks/forms";
import { useUser } from "@/contexts/user";
import Link from "next/link";
import PaginationSection from "./pagination";

export default function FormsDashboard() {
  const [idiomModal, setIdiomModal] = useState(false);
  const pageQuery = useSearchParams().getAll("page");
  const [currentPageInfo, setCurrentPageInfo]: any = useState(null);
  const [idToBeDeleted, setIdToBeDeleted]: any = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    getForms({
      setLoading,
      url: getVetsUrl,
      setData,
      setCurrentPageInfo,
    });
  };

  // Delete A Vet by using the Vet Id
  const deleteVet = async () => {
    try {
      await deleteForm({
        setLoading: setDeleting,
        setForms: setData,
        setCurrentPageInfo,
        getFormsUrl: getVetsUrl,
        id: idToBeDeleted,
      });
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
    <main className="max-w-[1400px] pb-24 large:mt-[104px] mt-20 w-full px-7 sm:px-[100px] large:px-[130px] mx-auto ">
      {loading && (
        <>
          <FormFallbackLoading />
        </>
      )}
      <IdiomProof
        title={"Confirm Delete"}
        buttonLabel="Delete Form"
        action={async () => {
          await deleteVet();
          setIdiomModal(false);
          setIdToBeDeleted(null);
        }}
        close={() => {
          setIdToBeDeleted(null);
          setIdiomModal(false);
        }}
        description={
          "Are you sure you want to delete this Vet? This action cannot be undone."
        }
        open={idiomModal}
        loading={deleting}
      />

      <div className="fixed z-50 bottom-0 left-0 w-screen h-20 px-6 sm:px-20 large:px-[112px] flex justify-center  bg-white backdrop-blur-lg bg-opacity-30">
        <div className="w-full max-w-[1650px] flex items-center tablet:justify-center justify-between h-full">
          <div className="w-full tablet:hidden">
            {" "}
            <PaginationSection currentPageInfo={currentPageInfo || {}} />{" "}
          </div>
          <Link
            href="/forms/create"
            className=" min-w-[180px] flex justify-center py-2.5 hover:bg-background-darkYellow/10 rounded-full bg-transparent border border-background-darkYellow text-[13px] text-background-darkYellow items-center gap-1"
          >
            <Plus width={15} /> Create A Form
          </Link>
        </div>
      </div>

      {/* Forms */}
      <div className="w-full pt-5 flex flex-wrap gap-3 md:gap-5 my-5">
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
        {currentPageInfo && !data[0] && (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <h2 className="text-lg font-bold text-primary-boulder900">
              No Form Added
            </h2>
          </div>
        )}
        <div className="w-full hidden justify-center tablet:flex pt-5">
          <div className="w-max max-w-full">
            <PaginationSection currentPageInfo={currentPageInfo || {}} />{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
