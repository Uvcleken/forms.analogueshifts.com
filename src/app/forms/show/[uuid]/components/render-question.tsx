"use client";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileInput from "@/components/application/file-input";
import { errorToast } from "@/utils/error-toast";

interface RenderQuestionProps {
  item: any;
  updateAnswerValue: any;
  formUUID: string;
}

const RenderQuestion: React.FC<RenderQuestionProps> = ({
  item,
  updateAnswerValue,
  formUUID,
}) => {
  const [fileValue, setFileValue]: any = useState(null);
  const [inputValue, setInputValue] = useState(item.answer || "");
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    if (item.type === "file" || item.type === "image") {
      if (item.answer) {
        setFileValue({ name: JSON.parse(item.answer)?.name });
      }
    } else if (item.type === "short_text" || item.type === "long_text") {
      setInputValue(item.answer || "");
    }
  }, [item.answer]);

  // Handle Input change
  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleFocusOut = () => {
    updateAnswerValue(item.number, inputValue);
  };

  // Upload File
  const uploadFile = async (file: any) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/upload/" + formUUID;
    const axios = require("axios");
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("type", item.type);

    let config = {
      method: "POST",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    setFileUploading(true);
    try {
      const data = await axios.request(config);
      setFileUploading(false);
      setFileValue(file);
      updateAnswerValue(
        item.number,
        JSON.stringify({ path: data.data.data.full_path, name: file.name })
      );
    } catch (error: any) {
      setFileUploading(false);
      errorToast(
        "Error Uploading File",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Upload File"
      );
    }
  };

  return (
    <div
      key={item.number}
      className="w-full mt-3 flex flex-col bg-white pb-5  border border-[#E7E7E7] h-max  rounded-xl"
    >
      <div className="px-3 md:px-6 py-3 md:py-4">
        <h3 className="text-base text-primary-boulder900 font-medium">
          {item.question}{" "}
          {item.required === "1" && (
            <span className="text-red-600">{" *"}</span>
          )}
        </h3>
      </div>
      <div className="px-3 md:px-6">
        {item.type === "short_text" && (
          <input
            onBlur={handleFocusOut}
            required={item.required === "1" ? true : false}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="e.g “Enter answer”"
            className="max-w-full w-full  h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
          />
        )}
        {item.type === "long_text" && (
          <Textarea
            onBlur={handleFocusOut}
            required={item.required === "1" ? true : false}
            value={inputValue}
            onChange={handleChange}
            placeholder="e.g “I am a software engineer”"
            className="text-[13px] rounded-2xl px-5 border border-primary-boulder200 font-light placeholder:text-primary-boulder300 text-primary-boulder950"
          />
        )}
        {item.type === "checkbox" && (
          <div className="w-full flex flex-col gap-2">
            {item.options.map((option: any) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={item.number + option.value}
                    onCheckedChange={() =>
                      updateAnswerValue(item.number, option.value)
                    }
                    checked={
                      item.answer !== null &&
                      item.answer.indexOf(option.value) > -1
                    }
                  />
                  <label
                    htmlFor={item.number + option.value}
                    className="text-[13px] font-light peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-boulder950"
                  >
                    {option.value}
                  </label>
                </div>
              );
            })}
          </div>
        )}
        {item.type === "radio" && (
          <RadioGroup
            onValueChange={(value: string) => {
              updateAnswerValue(item.number, value);
            }}
          >
            {item.options.map((option: any) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    checked={item.answer === option.value}
                    value={option.value}
                    id={item.number + option.value}
                  />
                  <Label
                    htmlFor={item.number + option.value}
                    className="text-[13px] font-light peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary-boulder950"
                  >
                    {option.value}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        )}
        {(item.type === "image" || item.type === "file") && (
          <div className="relative w-full h-max overflow-hidden rounded-3xl">
            {fileUploading && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-primary-boulder200/10">
                {" "}
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
            <FileInput
              value={fileValue}
              setValue={uploadFile}
              fileType={item.type}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderQuestion;
