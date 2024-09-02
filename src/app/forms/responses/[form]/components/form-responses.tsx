"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForms } from "@/hooks/forms";

import FormFallbackLoading from "@/app/forms/components/fallback-loading";

interface FormResponsesInterface {
  formUUID: string;
}

const FormResponses: React.FC<FormResponsesInterface> = ({ formUUID }) => {
  const router = useRouter();
  const { getResponses } = useForms();

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      await getResponses({ uuid: formUUID, setData: setResponses });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <main className="large:mt-[104px] mt-20 w-full max-w-[1400px] px-7 sm:px-[100px] large:px-[130px] mx-auto">
      {loading && <FormFallbackLoading />}
      <div className="w-full mb-8 pt-3 flex justify-center gap-5">
        <Link
          href={"/forms/" + formUUID}
          className="font-normal text-primary-boulder400 text-sm pb-2 px-2"
        >
          Questions
        </Link>
        <div className="text-sm pb-2 font-medium text-background-darkYellow border-b-2 cursor-pointer border-background-darkYellow px-2">
          Responses
        </div>
      </div>
      <section className="w-full mx-auto pt-4">
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
                Action
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
                    <Link href={"/forms/responses/view/" + item.uuid}>
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </section>
    </main>
  );
};

export default FormResponses;
