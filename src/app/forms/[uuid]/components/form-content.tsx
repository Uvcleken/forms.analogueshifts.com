"use client";
import { useState, useEffect } from "react";
import FormFallbackLoading from "../../components/fallback-loading";
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormDetails from "./form-details";
import FormQuestions from "./form-questions";
import FormDetailsDropdown from "@/components/application/form-details-menu";
import FormResponses from "./form-responses";
import { clearUserSession } from "@/helper-functions/clear-user-session";
import { successToast } from "@/helper-functions/success-toast";
import { errorToast } from "@/helper-functions/error-toast";

interface FormContentProps {
  uuid: string;
}

const FormContent: React.FC<FormContentProps> = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser]: any = useState(null);
  const [form, setForm]: any = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const axios = require("axios");

  // Fetch Form
  const getForm = async () => {
    let config = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/form/" + uuid,
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    try {
      const response = await axios.request(config);
      setForm(response.data.data.form);
      setQuestions(
        response.data.data.questions.sort(
          (a: any, b: any) => parseInt(a.number) - parseInt(b.number)
        )
      );
    } catch (error: any) {
      errorToast(
        "Error Fetching your Form",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Form"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  // Fetch Responses
  const getResponses = async () => {
    let config = {
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/form/responses/" + uuid,
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    try {
      const response = await axios.request(config);
      setResponses(response.data.data.response);
    } catch (error: any) {
      errorToast(
        "Error Fetching your Form Responses",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Form Responses"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const handleRefetchResponses = async () => {
    try {
      setLoading(true);
      await getResponses();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch Data Asynchronously
  const getData = async () => {
    try {
      setLoading(true);
      await getForm();
      await getResponses();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect((): any => {
    const auth = Cookies.get("analogueshifts");
    if (!auth) {
      window.location.href = "/login";
      return null;
    } else {
      setUser(JSON.parse(auth));
    }
  }, []);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <main className="max-w-dashboard mt-1 w-[90%] mx-auto">
      {loading && (
        <>
          <FormFallbackLoading />
        </>
      )}
      <Tabs defaultValue="questions" className="w-full relative">
        <TabsList className="w-full flex justify-center bg-transparent">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger onClick={handleRefetchResponses} value="responses">
            Responses
          </TabsTrigger>
        </TabsList>

        {/* Action Menu */}
        {form && (
          <div className="absolute h-11 right-0 top-0 flex items-center">
            {/* <TabsContent value="responses">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={handleRefetchResponses}
                      className="w-6 -mb-1 rounded-full hover:rotate-180 flex text-primary-boulder700 items-center justify-center duration-300 cursor-pointer"
                    >
                      <RefreshCcw width={15} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh Responses</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsContent> */}
            <FormDetailsDropdown
              user={user}
              form={form}
              setLoading={setLoading}
            />
          </div>
        )}

        <TabsContent value="questions" className="pt-5">
          {/* Form Details */}
          {form && (
            <FormDetails
              title={form.title}
              description={form.description}
              deadline={form.deadline}
              multiResponse={form.multi_response}
              timeout={form.timeout}
              user={user}
              uuid={uuid}
            />
          )}

          {/* Form Questions */}
          {form && (
            <FormQuestions uuid={uuid} user={user} questions={questions} />
          )}
        </TabsContent>
        <TabsContent value="responses">
          <FormResponses responses={responses} formUUID={uuid} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default FormContent;
