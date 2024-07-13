"use client";
import { useState } from "react";
import { Reorder } from "framer-motion";
import QuestionSection from "./question-section";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddQuestionForm from "./add-question-form";
import FormFallbackLoading from "../../components/fallback-loading";
import { clearUserSession } from "@/utils/clear-user-session";
import { successToast } from "@/utils/toast";
import { errorToast } from "@/utils/toast";

interface FormQuestionsProps {
  uuid: string;
  token: string;
  questions: any;
}

const FormQuestions: React.FC<FormQuestionsProps> = ({
  uuid,
  token,
  questions,
}) => {
  const [vetQuestions, setVetQuestions]: any = useState(questions);
  const [loading, setLoading] = useState(false);

  // Delete A question From the Database
  const handleDeleteQuestion = async (questionUUID: string) => {
    const axios = require("axios");
    const config = {
      method: "DELETE",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/question/delete/" +
        questionUUID,
      headers: { Authorization: "Bearer " + token },
    };

    try {
      setLoading(true);
      // Delete Question
      await axios.request(config);
      successToast("Question Deleted", "Your question has been removed.");

      // Reset The state that holds our Questions
      setVetQuestions((prev: any) =>
        prev.filter((item: any) => item.uuid !== questionUUID)
      );

      // Stop The Loading Process
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Error Deleting Question",
        error?.response?.data?.message ||
          error.message ||
          "Failed To delete Question"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  // This Function Uploads all the Question to the Database
  const uploadQuestions = async () => {
    const axois = require("axios");

    let reOrderedQuestions: any = [];
    // Update the Questions Order
    if (vetQuestions[0]) {
      vetQuestions.forEach((item: any, index: number) => {
        reOrderedQuestions.push({
          ...item,
          number: String(index + 1),
        });
      });
    }

    const config = {
      method: "POST",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/question/store/" +
        uuid,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: reOrderedQuestions,
    };

    setLoading(true);

    try {
      await axois.request(config);
      setLoading(false);
      successToast("Vet Updated", "Your Vet questions has been Updated");
      setVetQuestions(reOrderedQuestions);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "An error occured",
        error?.response?.data?.message ||
          error.message ||
          "Failed To update Form"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return (
    <main className="w-full py-10">
      {loading && <FormFallbackLoading />}
      <div
        style={{ background: "rgb(243 244 246/1)" }}
        className="w-full z-30 sticky top-[76px] backdrop-blur-lg mt-6 flex-wrap gap-5 flex justify-center md:justify-between items-center h-max py-5 "
      >
        <span className="font-medium md:text-lg text-base text-primary-boulder950">
          Questions
        </span>

        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <span className="py-2 min-h-10 h-max cursor-pointer rounded-full px-4 md:px-8 flex justify-center items-center gap-3 border border-background-lightYellow font-normal md:text-base text-sm bg-transparent text-background-lightYellow">
                Add question
                <i className="fas fa-plus"></i>
              </span>
            </DialogTrigger>
            <DialogContent className="w-[90%] duration-300 max-w-[1000px] h-max max-h-[80dvh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary-boulder950">
                  Create new question
                </DialogTitle>
              </DialogHeader>
              <AddQuestionForm
                questionNumber={String(vetQuestions.length + 1)}
                submitQuestion={(data) => {
                  setVetQuestions((prev: any) => [...prev, data]);
                }}
              />
            </DialogContent>
          </Dialog>
          {vetQuestions[0] && (
            <button
              onClick={uploadQuestions}
              className={`px-4 md:px-8 text-[#FEFEFE] text-base  font-normal flex items-center gap-2 py-2 min-h-10 h-max bg-background-lightYellow rounded-full border-none cursor-pointer`}
            >
              Update Questions
            </button>
          )}
        </div>
      </div>
      <div className="w-full mt-5 z-20">
        <Reorder.Group onReorder={setVetQuestions} values={vetQuestions}>
          {vetQuestions.map((item: any) => (
            <QuestionSection
              handleDeleteQuestion={handleDeleteQuestion}
              data={item}
              key={crypto.randomUUID()}
              setFormQuestions={setVetQuestions}
            />
          ))}
        </Reorder.Group>
      </div>
    </main>
  );
};

export default FormQuestions;
