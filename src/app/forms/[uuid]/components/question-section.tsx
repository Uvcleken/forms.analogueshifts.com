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
import { Switch } from "@/components/ui/switch";
import EditQuestionForm from "./edit-question-form";
import FileInput from "@/components/application/file-input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingSpinner from "@/components/application/loading-spinner";

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
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Removing a vet question
  const removeVetQuestion = (data: any) => {
    if (!data.uuid) {
      setFormQuestions((prev: any) =>
        prev.filter((item: any) => item.number !== data.number)
      );
      toast({
        variant: "default",
        title: "Question Deleted",
        description: "Your question has been removed.",
      });
    } else {
      handleDeleteQuestion(data.uuid);
    }
  };

  // Duplicate A vet question
  const duplicateVetQuestion = () => {};

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
          <input
            disabled
            type="text"
            value={data.question}
            placeholder="e.g “What is your role?”"
            className="max-w-full w-full disabled:bg-white h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
          />
        </div>

        {/* TYPE */}
        <div className="w-full md:w-[calc(35%-10px)] flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400">TYPE</p>
          <select
            disabled
            value={data.type}
            className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-none"
          >
            {[
              "short_text",
              "long_text",
              "radio",
              "checkbox",
              "image",
              "file",
            ].map((option) => {
              return (
                <option value={option} key={crypto.randomUUID()}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* IF TYPE IS A LONG TEXT OR SHORT TEXT  */}
        {(data.type === "short_text" || data.type === "long_text") && (
          <div className="w-full flex flex-col gap-3">
            <p className="text-sm font-normal text-primary-boulder400">
              ANSWER
            </p>

            {data.type === "long_text" ? (
              <textarea
                disabled
                value={data.answer}
                placeholder="e.g “Frontend Development”"
                className="max-w-full w-full h-24 pt-3 disabled:bg-white rounded-2xl px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
              ></textarea>
            ) : (
              <input
                disabled
                type="text"
                value={data.answer}
                placeholder="e.g “Frontend Development”"
                className="max-w-full disabled:bg-white w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
              />
            )}
          </div>
        )}

        {/* IF TYPE IS A FILE */}
        {(data.type === "image" || data.type === "file") && (
          <div className="w-full flex flex-col gap-3 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
            <FileInput fileType={data.type} />
          </div>
        )}

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
                    layout
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
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

        {/* REQUIRED */}
        <div className="w-full flex items-center gap-4">
          <p className="text-sm font-normal text-primary-boulder400">
            REQUIRED
          </p>
          <Switch disabled checked={data.required} />
        </div>

        {/* FOOTER */}
        <div className="w-full  flex-wrap justify-center items-center flex md:justify-end py-5 gap-5 border-t border-primary-boulder200">
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
