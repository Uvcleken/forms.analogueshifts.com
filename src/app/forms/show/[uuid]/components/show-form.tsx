"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import RenderQuestion from "./render-question";
import { Button } from "@/components/ui/button";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import { toggleArr } from "@/helper-functions/toggle-arr-value";
import IdiomProof from "@/components/application/idiom-proof";
import { checkAllQuestionFields } from "@/helper-functions/check-all-questions";
import { checkValidEmail } from "@/helper-functions/check-valid-email";
import { clearUserSession } from "@/helper-functions/clear-user-session";
import { errorToast } from "@/helper-functions/error-toast";

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
  const [seconds, setSeconds]: any = useState(null);
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

  async function getForm() {
    const axios = require("axios");
    const config = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/form/form/" + formUUID,
    };

    try {
      setLoading(true);
      let response = await axios.request(config);
      setForm(response.data.data.form);
      setQuestions(response.data.data.questions);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response.data.message !== "Form closed") {
        errorToast(
          "Error Fetching Form",
          error?.response?.data?.message ||
            error.message ||
            "Failed To Fetch Form"
        );
      } else {
        setFormClosed(true);
      }
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  }

  const clearForm = () => {
    setQuestions((prev: any) =>
      prev.map((item: any) => {
        return { ...item, answer: null };
      })
    );
  };

  const handleSubmit = async () => {
    let answers: any[] = [];

    questions?.forEach((item: any) => {
      answers.push({
        question_uuid: item.uuid,
        answer: JSON.stringify(item.answer),
      });
    });

    const axios = require("axios");
    const config = {
      method: "POST",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/store/answers/" +
        formUUID +
        "?email=" +
        email,
      data: {
        email: email,
        responses: answers,
      },
    };
    try {
      setLoading(true);
      await axios.request(config);
      setLoading(false);
      setFormSubmitted(true);
    } catch (error: any) {
      errorToast(
        "Error submiting response",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Submit Response"
      );
      setLoading(false);
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  // Handle Form Keydown
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (formUUID) {
      getForm();
    }
  }, [formUUID]);

  // Check if there is a timeout
  // useEffect((): any => {
  //   if (form?.timeout !== null && parseInt(form?.timeout)) {
  //     setTimeOutModal(true);
  //   }
  // }, [form]);

  // Handle Timeout
  // useEffect(() => {
  //   if (typeof seconds === "number" && seconds <= 0) {
  //     handleSubmit();
  //     return;
  //   }
  //   if (typeof seconds === "number") {
  //     const intervalId = setInterval(() => {
  //       setSeconds((prev: number) => prev - 1);
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [seconds]);

  // Function to format time as mm:ss
  const formatTime = (s: any) => {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartTimer = () => {
    if (checkValidEmail(email)) {
      let timeOutMinutes = parseInt(form.timeout);
      setTimeOutModal(false);
      setSeconds(60 * timeOutMinutes);
    } else {
      errorToast("Invalid Email", "Must provide a valid email");
    }
  };

  return (
    <>
      {/* Time Out Modal */}
      <IdiomProof
        open={timeOutModal}
        description={`You have ${form?.timeout} minutes to fill this form and submit it. Form will be submitted automatically if you fail to finish on time. Enter email in the field below to proceed. Note that the email will be used to submit your form, and It is required.`}
        title="Instruction"
        label="Proceed"
        action={handleStartTimer}
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
                Form Closed
              </h1>
              <div className="w-full border-b border-dotted mb-4"></div>
              <span className="text-base w-full  text-primary-boulder700">
                This Form Is Closed
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form
          onKeyDown={handleKeyDown}
          onSubmit={(e: any) => {
            e.preventDefault();
            if (checkAllQuestionFields(questions, errorToast)) {
              handleSubmit();
            }
          }}
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

                {seconds !== null && (
                  <p className="text-base w-full  text-primary-boulder700 mt-4">
                    Time Left: <b>{formatTime(seconds)}</b>
                  </p>
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
                    key={crypto.randomUUID()}
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
