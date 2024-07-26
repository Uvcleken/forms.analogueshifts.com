"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionAndAnswerProps {
  data: any;
}

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-x-5 gap-y-5 bg-[#FEFEFE]  border border-[#E7E7E7] h-max px-4 lg:px-10 py-5 rounded-3xl">
      {/* QUESTION */}
      <div className="w-full  flex flex-col gap-3">
        <p className="text-sm font-normal text-primary-boulder400">QUESTION</p>
        <p className="max-w-full w-full   text-sm font-normal  text-primary-boulder950">
          {data?.question}
        </p>
      </div>

      {/* IF TYPE IS A LONG TEXT OR SHORT TEXT  */}
      {(data?.type === "short_text" || data?.type === "long_text") && (
        <div className="w-full flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400">ANSWER</p>

          {data?.type === "long_text" ? (
            <span className="max-w-full w-full h-max min-h-24 pt-3  rounded-2xl px-5 border border-primary-boulder200 text-[13px] font-light text-primary-boulder950">
              {data?.form_answers[0]?.answer || ""}
            </span>
          ) : (
            <input
              disabled
              type="text"
              value={data?.form_answers[0]?.answer}
              placeholder="e.g “Frontend Development”"
              className="max-w-full disabled:bg-white w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
            />
          )}
        </div>
      )}

      {/* IF TYPE IS A FILE */}
      {(data?.type === "file" || data?.type === "image") && (
        <div className="w-full flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400">
            {data?.type.toUpperCase()} URL
          </p>

          <a
            href={JSON.parse(data?.form_answers[0]?.answer)?.path || ""}
            target="_blank"
            className="w-max h-max  rounded-2xl  text-[13px] font-light text-primary-boulder950 underline"
          >
            Open {data?.type.toUpperCase()}
          </a>
        </div>
      )}

      {/* IF TYPE IS RADIO */}
      {data?.type === "radio" && (
        <div className="w-full flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400 mb-1">
            OPTIONS
          </p>
          {/* DISPLAYING OPTIONS */}
          <RadioGroup defaultValue={data?.form_answers[0]?.answer || ""}>
            {data?.options.map((option: any) => {
              return (
                <div key={data.number} className="flex items-center space-x-2">
                  <RadioGroupItem
                    disabled
                    value={option.value || ""}
                    id={data.number + option.value}
                  />
                  <Label
                    htmlFor={data.number + option.value}
                    className="text-[13px] font-light peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-boulder950"
                  >
                    {option.value}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      )}

      {/* If type is a checkbox */}
      {/* IF TYPE IS RADIO */}
      {data?.type === "checkbox" && (
        <div className="w-full flex flex-col gap-3">
          <p className="text-sm font-normal text-primary-boulder400 mb-1">
            OPTIONS
          </p>
          {/* DISPLAYING OPTIONS */}
          <div className="w-full flex flex-col gap-2">
            {data?.options.map((option: any) => {
              return (
                <div key={data.number} className="flex items-center space-x-2">
                  <Checkbox
                    id={data.number + option.value}
                    checked={
                      data?.form_answers[0]?.answer?.indexOf(option.value) > -1
                    }
                  />
                  <label
                    htmlFor={data.number + option.value}
                    className="text-[13px] font-light peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-boulder950"
                  >
                    {option.value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAndAnswer;
