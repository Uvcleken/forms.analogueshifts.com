"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import RenderQuestion from "./render-question";
import { Button } from "@/components/ui/button";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import { toggleArr } from "@/utils/toggle-arr-value";
import IdiomProof from "@/components/application/idiom-proof";
import { errorToast } from "@/utils/toast";
import { getForm } from "@/utils/show-form/get-form";
import { submitResponse } from "@/utils/show-form/submit-response";
import {
  handleStartTimer,
  checkAllQuestionFields,
} from "@/utils/show-form/helper-functions";
import Countdown from "./countdown";

interface ShowFormProps {
  formUUID: string;
}

const ShowForm: React.FC<ShowFormProps> = ({ formUUID }) => {
  const [form, setForm]: any = useState(null);
  const [questions, setQuestions]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [formClosed, setFormClosed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timeOutModal, setTimeOutModal] = useState(false);
  const [timeOutMinutes, setTimeoutMinutes]: any = useState(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

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

  // Handle Clear Form
  const clearForm = () => {
    setQuestions((prev: any) =>
      prev.map((item: any) => {
        return { ...item, answer: null };
      })
    );
  };

  // Handling Form Submittion
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (checkAllQuestionFields(questions, errorToast)) {
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

  useEffect(() => {
    if (formUUID) {
      getForm(setLoading, setForm, formUUID, setQuestions, setFormClosed);
    }
  }, [formUUID]);

  // Check if there is a timeout
  useEffect((): any => {
    if (form?.timeout !== null && parseInt(form?.timeout)) {
      setTimeOutModal(true);
    }
  }, [form]);

  return (
    <>
      {/* Time Out Modal */}
      <IdiomProof
        open={timeOutModal}
        emailValue={email}
        description={`You have ${form?.timeout} minutes to fill this vet and submit it. Vet will be submitted automatically if you fail to finish on time. Enter email in the field below to proceed. Note that the email will be used to submit your vet, and It is required.`}
        title="Instruction"
        label="Proceed"
        action={() =>
          handleStartTimer(email, form, setTimeOutModal, setTimeoutMinutes)
        }
        close={() => {
          router.back();
        }}
        emailInput={true}
        onChangeEmailValue={(value: string) => setEmail(value)}
      />

      {formClosed ? (
        <div className="w-containerWidth max-w-showFormWidth mx-auto pb-7 mt-5">
          <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-lightYellow mb-4">
            <div className="px-3 md:px-6 py-3 md:pt-6">
              <h1 className="text-4xl w-full mt-1.5 mb-5  text-primary-boulder950 font-semibold">
                Vet Closed
              </h1>
              <div className="w-full border-b border-dotted mb-4"></div>
              <span className="text-base w-full  text-primary-boulder700">
                This Vet Is Closed
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form
          onKeyDown={handleKeyDown}
          onSubmit={handleFormSubmit}
          className="w-containerWidth max-w-showFormWidth mx-auto pb-7 mt-5"
        >
          {loading && <FormFallbackLoading />}

          {form && !formSubmitted && (
            <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-lightYellow mb-4">
              <div className="px-3 md:px-6 py-3 md:pt-6">
                <h1 className="text-4xl w-full mt-1.5 mb-5  text-primary-boulder950 font-semibold">
                  {form.title}
                </h1>
                <div className="w-full border-b border-dotted mb-4"></div>
                <span className="text-base w-full  text-primary-boulder700">
                  {form.description}
                </span>

                {timeOutMinutes !== null && (
                  <Countdown
                    email={email}
                    router={router}
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
                  placeholder="“Enter Email”"
                  className="max-w-full mt-4 w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
                />
              </div>
            </div>
          )}
          {form && formSubmitted && (
            <div className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl border-t-8 border-t-background-lightYellow mb-4">
              <div className="px-3 md:px-6 py-3 md:pt-6">
                <h1 className="text-4xl w-full mt-1.5 mb-5  text-primary-boulder950 font-semibold">
                  {form.title}
                </h1>
                <div className="w-full border-b border-dotted mb-4"></div>
                <span className="text-base w-full  text-primary-boulder700">
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
              <div className="w-full flex justify-between items-center">
                <Button
                  type="button"
                  onClick={clearForm}
                  className="bg-transparent hover:bg-transparent text-background-lightYellow hover:text-background-lightYellow/80"
                >
                  Clear form
                </Button>
                <Button
                  type="submit"
                  className="bg-background-lightYellow hover:bg-background-lightYellow/80 w-28"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default ShowForm;
