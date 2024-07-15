"use client";
import { useEffect, useState } from "react";

import QuestionAndAnswer from "./question-and-answer";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";

import { clearUserSession } from "@/utils/clear-user-session";
import { errorToast } from "@/utils/toast";

interface ShowResultProps {
  resultUUID: string;
}

const ShowResult: React.FC<ShowResultProps> = ({ resultUUID }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse]: any = useState(null);

  async function getResult() {
    const axios = require("axios");
    const config = {
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/result/" +
        resultUUID,
    };

    try {
      setLoading(true);
      let response = await axios.request(config);
      if (response.data.success) {
        setResponse(response.data.data.response);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Error Fetching Result",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Result"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  }

  useEffect(() => {
    getResult();
  }, []);

  return (
    <>
      {loading && <FormFallbackLoading />}
      <div className="w-containerWidth max-w-showFormWidth mx-auto pb-7 mt-5">
        <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-lightYellow mb-4">
          <div className="px-3 md:px-6 py-3 md:pt-6">
            <h1 className="text-4xl w-full mt-1.5 mb-5  text-primary-boulder950 font-semibold">
              Vet Result
            </h1>
            <div className="w-full border-b border-dotted mb-4"></div>
            <span className="text-base w-full  text-primary-boulder700 ">
              {response &&
                `This is your answers and score for the form: ${response.form.title}`}
            </span>{" "}
            <p className="text-base w-full  text-primary-boulder700 mt-3">
              {response && (
                <span>
                  Overall Score: <b>{response.score}</b>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Answers */}
        <div className="mt-6 w-full flex flex-col gap-5 pb-10">
          {response &&
            response?.form?.form_questions.map((item: any) => {
              return (
                <QuestionAndAnswer key={crypto.randomUUID()} data={item} />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ShowResult;
