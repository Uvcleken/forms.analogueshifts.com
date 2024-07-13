"use client";
import { useState, useEffect } from "react";
import FormFallbackLoading from "../../components/fallback-loading";
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormDetails from "./form-details";
import FormQuestions from "./form-questions";
import FormDetailsDropdown from "@/components/application/form-details-menu";
import FormResponses from "./form-responses";

import { useUser } from "@/contexts/user";
import { useForms } from "@/hooks/forms";

interface FormContentProps {
  uuid: string;
}

const FormContent: React.FC<FormContentProps> = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm]: any = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  const { user }: any = useUser();
  const { getForm, getResponses } = useForms();

  const token = Cookies.get("analogueshifts");

  // Fetch Form
  const fetchForm = async () => {
    await getForm({
      setLoading,
      uuid,
      setData: (response) => {
        setForm(response.data.data.form);
        setQuestions(
          response.data.data.questions.sort(
            (a: any, b: any) => parseInt(a.number) - parseInt(b.number)
          )
        );
      },
    });
  };

  // Fetch Responses
  const fetchResponses = async () => {
    await getResponses({ uuid, setData: setResponses });
  };

  const handleRefetchResponses = async () => {
    try {
      setLoading(true);
      await fetchResponses();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch Data Asynchronously
  const getData = async () => {
    try {
      setLoading(true);
      await fetchForm();
      await fetchResponses();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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
            <FormDetailsDropdown form={form} setLoading={setLoading} />
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
              uuid={uuid}
            />
          )}

          {/* Form Questions */}
          {form && (
            <FormQuestions
              token={token || ""}
              uuid={uuid}
              questions={questions}
            />
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
