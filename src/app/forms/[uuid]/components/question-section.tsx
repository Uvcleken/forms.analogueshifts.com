"use client";
import {
  Reorder,
  AnimatePresence,
  motion,
  useDragControls,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import EditQuestionForm from "./edit-question-form";
import { useState } from "react";
import LoadingSpinner from "@/components/application/loading-spinner";
import { successToast } from "@/utils/toast";

interface QuestionSectionProps {
  data: any;
  setFormQuestions: any;
  handleDeleteQuestion: (questionUUID: string) => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  data,
  setFormQuestions,
  handleDeleteQuestion,
}) => {
  const controls = useDragControls();
  const [loading, setLoading] = useState(false);

  // Removing a vet question
  const removeVetQuestion = (data: any) => {
    if (!data.uuid) {
      setFormQuestions((prev: any) =>
        prev.filter((item: any) => item.number !== data.number)
      );
      successToast("Question Deleted", "Your question has been removed.");
    } else {
      handleDeleteQuestion(data.uuid);
    }
  };

  // Edit a question In the List
  const updateFormQuestionValue = (data: any) => {
    setFormQuestions((prev: any) =>
      prev.map((item: any) => {
        if (item.number !== data.number) {
          return item;
        } else {
          return {
            ...item,
            question: data.question,
            answer: data.answer,
            type: data.type,
            options: data.options,
            required: data.required,
          };
        }
      })
    );
  };

  return (
    <Reorder.Item
      value={data}
      key={data.number}
      dragListener={false}
      dragControls={controls}
    >
      {loading && <LoadingSpinner />}
      <form className="w-full mt-5 flex flex-wrap gap-x-5 gap-y-5 bg-[#FEFEFE]  border border-[#E7E7E7] h-max px-4 lg:px-10 py-5 rounded-3xl">
        <div
          onPointerDown={(e) => controls.start(e)}
          className="cursor-move w-full h-3 flex justify-center items-center"
        >
          <i className="fas fa-grip text-primary-boulder400"></i>
        </div>

        {/* QUESTION */}
        <div className="w-full md:w-[calc(65%-10px)] flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400">
            QUESTION
          </p>
          <p className="max-w-full w-full pl-2 text-[13px] font-light text-primary-boulder950">
            {data.question}
          </p>
        </div>

        {/* TYPE */}
        <div className="w-full md:w-[calc(35%-10px)] flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400">TYPE</p>
          <p className="max-w-full w-full text-xs font-light text-primary-boulder950">
            {data.type?.toUpperCase()}
          </p>
        </div>

        {/* IF TYPE IS RADIO */}
        {(data.type === "radio" || data.type === "checkbox") && (
          <div className="w-full flex flex-col gap-3">
            <p className="text-sm font-normal text-primary-boulder400 mb-1">
              OPTIONS
            </p>
            {/* DISPLAYING OPTIONS */}
            <AnimatePresence mode={"sync"}>
              {data.options.map((item: any) => {
                return (
                  <motion.div
                    key={item.id}
                    className="w-full flex justify-between items-center"
                  >
                    <div className="w-11/12 flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 border border-primary-boulder200 ${
                          data.type === "radio" ? "rounded-full" : "rounded"
                        }`}
                      ></div>
                      <input
                        disabled
                        value={item.value}
                        className="w-[calc(100%-26px)] disabled:bg-transparent text-[13px] pb-1 px-1 font-light  text-primary-boulder950 outline-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* FOOTER */}
        <div className="w-full  flex-wrap justify-center items-center flex md:justify-end py-5 gap-5 ">
          {/* EDIT ACTION BUTTON */}
          <Dialog>
            <DialogTrigger>
              <span className="text-xs font-normal hover:text-primary-boulder950 text-primary-boulder400 border-none bg-transparent outline-none flex items-center gap-1">
                <i className="fa-regular fa-edit text-sm"></i> EDIT
              </span>
            </DialogTrigger>
            <DialogContent className="w-[90%] duration-300 max-w-[1000px] h-max max-h-[80dvh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary-boulder950">
                  Edit Question {data.number}
                </DialogTitle>
              </DialogHeader>
              <EditQuestionForm
                questionData={data}
                submit={updateFormQuestionValue}
              />
            </DialogContent>
          </Dialog>

          {/* DUPLICATE ACTION BUTTON */}
          {/* <button
            onClick={duplicateVetQuestion}
            type="button"
            className="text-xs font-normal hover:text-primary-boulder950 text-primary-boulder400 border-none bg-transparent outline-none flex items-center gap-1"
          >
            <i className="fa-regular fa-copy text-sm"></i> DUPLICATE
          </button> */}

          {/* DELETE ACTION BUTTON */}
          <Dialog>
            <DialogTrigger>
              <span className="text-xs font-normal text-red-600 border-none bg-transparent outline-none flex items-center gap-1">
                <i className="fa-regular fa-trash-can text-sm"></i> REMOVE
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-primary-boulder950">
                  Are you sure you want to remove the Question:
                </DialogTitle>
                <DialogDescription>{data.question}</DialogDescription>
              </DialogHeader>
              <DialogTrigger className="w-max ml-auto">
                <span
                  onClick={() => removeVetQuestion(data)}
                  className="bg-red-500 text-background-white300 px-5 py-2.5 rounded text-sm hover:bg-red-500/80"
                >
                  Delete Question
                </span>
              </DialogTrigger>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </Reorder.Item>
  );
};

export default QuestionSection;
