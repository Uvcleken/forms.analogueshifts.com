"use client";
import { useState, useEffect } from "react";
import FormFallbackLoading from "../../components/fallback-loading";
import Cookies from "js-cookie";

import FormDetails from "./form-details";
import FormQuestions from "./form-questions";

import { useUser } from "@/contexts/user";
import { useForms } from "@/hooks/forms";
import Link from "next/link";

interface FormContentProps {
  uuid: string;
}

const FormContent: React.FC<FormContentProps> = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm]: any = useState(null);
  const [questions, setQuestions] = useState([]);

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

  // Fetch Data Asynchronously
  const getData = async () => {
    try {
      setLoading(true);
      await fetchForm();
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
    <main className="large:mt-[104px] mt-20 w-full max-w-[1400px] px-7 sm:px-[100px] large:px-[130px] mx-auto">
      {loading && (
        <>
          <FormFallbackLoading />
        </>
      )}
      <div className="w-full mb-8 pt-3 flex justify-center gap-5">
        <div className="text-sm pb-2 font-medium text-background-darkYellow border-b-2 cursor-pointer border-background-darkYellow px-2">
          Questions
        </div>
        <Link
          href={"/forms/responses/" + form?.uuid}
          className="font-normal text-primary-boulder400 text-sm pb-2 px-2"
        >
          Responses
        </Link>
      </div>

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
        <FormQuestions token={token || ""} uuid={uuid} questions={questions} />
      )}
    </main>
  );
};

export default FormContent;
