"use client";
import { useToast } from "@/contexts/toast";
import { useUser } from "@/contexts/user";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import RenderQuestion from "./render-question";
import { toggleArr } from "@/utils/toggle-arr-value";
import IdiomProof from "@/components/application/idiom-proof";
import { submitResponse } from "@/utils/show-form/submit-response";
import {
  handleStartTimer,
  checkAllQuestionFields,
} from "@/utils/show-form/helper-functions";
import Countdown from "./countdown";

interface ShowFormProps {
  vet: any;
  formUUID: string;
}

const ShowForm: React.FC<ShowFormProps> = ({ formUUID, vet }) => {
  const { user } = useUser();
  const [form, setForm]: any = useState(vet?.form || null);
  const [questions, setQuestions]: any = useState(vet?.questions || null);
  const [loading, setLoading] = useState(false);
  const [formClosed, setFormClosed] = useState(vet?.formClosed ? true : false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);
  const [timeOutMinutes, setTimeoutMinutes]: any = useState(null);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { notifyUser }: any = useToast();

  // Update The value of the Form
  const updateAnswerValue = useCallback((number: string, newValue: string) => {
    setQuestions((prev: any) =>
      prev.map((item: any) => {
        if (item.number === number) {
          if (item.type === "checkbox") {
            return { ...item, answer: toggleArr(item.answer, newValue) };
          } else if (
            item.type === "short_text" ||
            item.type === "long_text" ||
            item.type === "radio" ||
            item.type === "file" ||
            item.type === "image"
          ) {
            return { ...item, answer: newValue };
          }
        }
        return item;
      })
    );
  }, []);

  // Handling Form Submittion
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (checkAllQuestionFields(questions, notifyUser)) {
      submitResponse(questions, formUUID, email, setLoading, setFormSubmitted);
    }
  };

  // Handle Auto Subimission
  const handleAutoSubmission = () => {
    submitResponse(questions, formUUID, email, setLoading, setFormSubmitted);
  };

  // Handle Form Keydown
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // Check if there is a timeout
  useEffect((): any => {
    if (form?.timeout !== null && parseInt(form?.timeout)) {
      setTimeOutModal(true);
    }
  }, [form]);

  useEffect(() => {
    if (user) {
      setEmail(user?.user?.email);
    }
  }, [user]);

  return (
    <>
      {/* Time Out Modal */}
      <IdiomProof
        open={timeOutModal}
        description={`You have ${form?.timeout} minutes to fill this form and submit it. Form will be submitted automatically if you fail to finish on time.`}
        title="Instruction"
        buttonLabel="Start"
        action={() =>
          handleStartTimer(form, setTimeOutModal, setTimeoutMinutes)
        }
        close={() => {
          router.back();
        }}
      />

      {formClosed ? (
        <div className="large:mt-[124px] mt-24 w-full max-w-[1200px] px-7 sm:px-[100px] large:px-[130px] mx-auto">
          <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-darkYellow mb-4">
            <div className="px-3 md:px-6 py-3 md:pt-6">
              <h1 className="text-3xl tablet:text-2xl w-full mt-1.5 mb-5 tablet:mb-2.5  text-primary-boulder950 font-semibold">
                <b> Vet Closed</b>
              </h1>
              <div className="w-full border-b border-dotted mb-4 tablet:mb-1.5"></div>
              <span className="text-base tablet:text-xs w-full  text-primary-boulder700">
                This Vet Is Closed
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form
          onKeyDown={handleKeyDown}
          onSubmit={handleFormSubmit}
          className="large:mt-[124px] mt-24 w-full max-w-[1200px] px-7 sm:px-[100px] large:px-[130px] mx-auto"
        >
          {form && !formSubmitted && (
            <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-darkYellow mb-4">
              <div className="px-3 md:px-6 py-3 md:pt-6">
                <h1 className="text-3xl tablet:text-2xl w-full mt-1.5 mb-5 tablet:mb-2.5  text-primary-boulder950 font-semibold">
                  <b> {form.title}</b>
                </h1>
                <div className="w-full border-b border-dotted mb-4 tablet:mb-1.5"></div>
                <span className="text-[15px] font-medium tablet:text-xs w-full  text-primary-boulder700">
                  {form.description}
                </span>

                {timeOutMinutes !== null && (
                  <Countdown
                    email={email}
                    router={router}
                    loading={loading}
                    setEmail={setEmail}
                    durationInMinutes={timeOutMinutes}
                    submitForm={handleAutoSubmission}
                  />
                )}
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="Enter submission email"
                  className="max-w-full mt-4 w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-darkYellow"
                />
              </div>
            </div>
          )}
          {form && formSubmitted && (
            <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-darkYellow mb-4">
              <div className="px-3 md:px-6 py-3 md:pt-6">
                <h1 className="text-3xl tablet:text-2xl w-full mt-1.5 mb-5 tablet:mb-2.5  text-primary-boulder950 font-semibold">
                  <b> {form.title}</b>
                </h1>
                <div className="w-full border-b border-dotted mb-4 tablet:mb-1.5"></div>
                <span className="text-[15px] font-medium tablet:text-xs w-full  text-primary-boulder700">
                  Your response has been recorded!
                </span>
              </div>
            </div>
          )}
          {questions && questions[0] && !formSubmitted && (
            <div className="w-full flex flex-col gap-4">
              {questions.map((item: any) => {
                return (
                  <RenderQuestion
                    key={item.number}
                    item={item}
                    formUUID={formUUID}
                    updateAnswerValue={updateAnswerValue}
                  />
                );
              })}
              <div className="w-full flex justify-end items-center">
                <button
                  disabled={loading}
                  onClick={handleFormSubmit}
                  type="submit"
                  className="px-10 text-[#FEFEFE] text-base duration-300 hover:scale-105 font-normal flex items-center gap-2 h-12 bg-background-darkYellow rounded-full border-none cursor-pointer"
                >
                  {loading ? "Submiting..." : "    Submit"}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default ShowForm;
