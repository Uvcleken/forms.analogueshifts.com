"use client";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import QuestionSection from "./question-section";
import LoadingSpinner from "@/components/application/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddQuestionForm from "./add-question-form";

interface FormQuestionsProps {
  uuid: string;
  user: any;
  questions: any;
}

const FormQuestions: React.FC<FormQuestionsProps> = ({
  uuid,
  user,
  questions,
}) => {
  const [vetQuestions, setVetQuestions]: any = useState(questions);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Delete A question From the Database
  const handleDeleteQuestion = async (questionUUID: string) => {
    const axios = require("axios");
    const config = {
      method: "DELETE",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/question/delete/" +
        questionUUID,
      headers: { Authorization: "Bearer " + user.token },
    };

    try {
      setLoading(true);

      // Delete Question
      await axios.request(config);
      toast({
        variant: "default",
        title: "Question Deleted!",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      // Reset The state that holds our Questions
      setVetQuestions((prev: any) =>
        prev.filter((item: any) => item.uuid !== questionUUID)
      );

      // Stop The Loading Process
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error Deleting Question",
        description: error.message,
      });
    }
  };

  // This Function Uploads all the Question to the Database
  const uploadQuestions = async () => {
    const axois = require("axios");

    let reOrderedQuestions: any = [];
    // Update the Questions Order
    if (vetQuestions[0]) {
      vetQuestions.forEach((item: any, index: number) => {
        reOrderedQuestions.push({ ...item, number: String(index + 1) });
      });
    }
    setVetQuestions(reOrderedQuestions);

    const config = {
      method: "POST",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/question/store/" +
        uuid,
      headers: {
        Authorization: "Bearer " + user.token,
      },
      data: reOrderedQuestions,
    };

    setLoading(true);
    try {
      const response = await axois.request(config);
      setLoading(false);
      toast({
        variant: "default",
        title: "Your Form questions has been Updated",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <main className="w-full">
      {loading && <LoadingSpinner />}
      <div className="w-full mt-6 flex-wrap gap-5 flex justify-center md:justify-between items-center h-max py-5 ">
        <span className="font-medium md:text-lg text-base text-primary-boulder950">
          Questions
        </span>

        <Dialog>
          <DialogTrigger>
            <span className="h-10 cursor-pointer rounded-full px-8 flex justify-center items-center gap-3 border border-background-lightYellow font-normal md:text-base text-sm bg-transparent text-background-lightYellow">
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
                setVetQuestions((prev: any) => [data, ...prev]);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full mt-5">
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
      {vetQuestions[0] && (
        <div className="w-full mt-5 mb-12 flex justify-end">
          <button
            onClick={uploadQuestions}
            className={`px-10 text-[#FEFEFE] text-base duration-300 hover:scale-105 font-normal flex items-center gap-2 h-12 bg-background-lightYellow rounded-full border-none cursor-pointer`}
          >
            Update Questions
          </button>
        </div>
      )}
    </main>
  );
};

export default FormQuestions;
