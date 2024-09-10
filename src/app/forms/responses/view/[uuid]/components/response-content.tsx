"use client";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ResponseDetails from "./response-details";
import AnswerSection from "./answer-section";
import { clearUserSession } from "@/utils/clear-user-session";
import { errorToast } from "@/utils/toast";
import { useUser } from "@/contexts/user";

interface ResponseContentProps {
  uuid: string;
}

const ResponseContent: React.FC<ResponseContentProps> = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const { user }: any = useUser();
  const axios = require("axios");
  const [response, setResponse] = useState(null);
  const [answers, setAnswers] = useState([]);

  const token = Cookies.get("analogueshifts");

  // Fetch Response
  const getResponse = async () => {
    let config = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/form/response/" + uuid,
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    try {
      setLoading(true);
      const res = await axios.request(config);
      setLoading(false);
      console.log(res);

      setResponse(res.data.data.response);
      setAnswers(res.data.data.answers);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Error fetching your Response",
        error?.response?.data?.message ||
          error.message ||
          "Failed To fetch Response"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  useEffect(() => {
    if (user) {
      getResponse();
    }
  }, [user]);

  return (
    <section className="large:mt-[124px] mt-24 w-full max-w-[1200px] px-7 sm:px-[100px] large:px-[130px] mx-auto">
      {loading && <FormFallbackLoading />}
      {response && (
        <ResponseDetails
          details={response}
          setLoading={setLoading}
          getResponse={getResponse}
          userToken={token || ""}
        />
      )}
      <div className="mt-6 w-full flex flex-col gap-5 pb-10">
        {answers &&
          answers.map((item: any) => {
            return <AnswerSection key={item.number} data={item} />;
          })}
      </div>
    </section>
  );
};

export default ResponseContent;
