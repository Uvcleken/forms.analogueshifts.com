"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import FormFallbackLoading from "../../components/fallback-loading";
import { Switch } from "@/components/ui/switch";
import React from "react";

import {
  convertDateFormat,
  FormDetailsProps,
} from "@/utils/forms/forms-details";

import { useForms } from "@/hooks/forms";

const FormDetails: React.FC<FormDetailsProps> = ({
  title,
  description,
  timeout,
  multiResponse,
  deadline,
  uuid,
}) => {
  const [loading, setLoading] = useState(false);
  const [isTimeout, setIsTimeOut] = useState(
    timeout || deadline ? true : false
  );
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [multiResponseSwitch, setMultiResponseSwitch]: any = useState(
    multiResponse === "1" ? true : false
  );
  const [timeoutValue, setTimeoutValue] = useState(parseInt(timeout) || "");
  const [deadlineValue, setDeadlineValue] = useState(
    deadline ? convertDateFormat(deadline) : ""
  );

  const { updateForm } = useForms();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateForm({
      title: titleValue,
      description: descriptionValue,
      deadline: isTimeout ? deadlineValue : null,
      timeout: isTimeout ? timeoutValue : null,
      multi_response: multiResponseSwitch,
      setLoading,
      uuid,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-wrap gap-x-5 gap-y-5 bg-[#FEFEFE]  border border-[#E7E7E7] px-4 lg:px-10 py-7 rounded-3xl"
    >
      {loading && (
        <>
          <FormFallbackLoading />
        </>
      )}

      {/* Multi Response Switch */}
      <div className="w-full md:w-[calc(20%-10px)] flex flex-col gap-4">
        <p className="text-sm font-normal text-primary-boulder400">
          MULTI RESPONSE
        </p>
        <div className="w-full">
          <Switch
            checked={multiResponseSwitch}
            onCheckedChange={(checked) => setMultiResponseSwitch(checked)}
          />
        </div>
      </div>

      {/* Title */}
      <div className="w-full md:w-[calc(80%-10px)] flex flex-col gap-3">
        <p className="text-sm font-normal text-primary-boulder400">TITLE</p>
        <input
          required
          type="text"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder="e.g “Getting to know you”"
          className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
        />
      </div>

      {/* Description */}
      <div className="w-full flex flex-col gap-3">
        <p className="text-sm font-normal text-primary-boulder400">
          DESCRIPTION
        </p>
        <div className="w-full">
          <Textarea
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            className="text-[13px] rounded-2xl px-5 border border-primary-boulder200 font-light placeholder:text-primary-boulder300 text-primary-boulder950"
          />
        </div>
      </div>

      {/* Option for Timeout */}
      <div className="w-full flex flex-wrap gap-4">
        <p className="text-sm font-normal text-primary-boulder400">
          SET TIMEOUT & DEADLINE
        </p>
        <Switch
          checked={isTimeout}
          onCheckedChange={(checked) => setIsTimeOut(checked)}
        />
      </div>

      {/* Timeout & Deadline */}
      {isTimeout && (
        <>
          <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-3">
            <p className="text-sm font-normal text-primary-boulder400">
              TIME OUT (In Minutes)
            </p>
            <input
              type="number"
              value={timeoutValue}
              onChange={(e: any) => setTimeoutValue(e.target.value)}
              className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
            />
          </div>
          <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-3">
            <p className="text-sm font-normal text-primary-boulder400">
              DEADLINE
            </p>
            <input
              required
              type="datetime-local"
              value={deadlineValue}
              onChange={(e: any) => setDeadlineValue(e.target.value)}
              className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
            />
          </div>
        </>
      )}

      {/* Submit Form */}
      <div className=" flex w-full">
        <input
          value="Save changes"
          type="submit"
          className={`px-10 text-[#FEFEFE] text-base duration-300 hover:scale-105 font-normal flex items-center gap-2 h-12 bg-background-lightYellow rounded-full border-none cursor-pointer`}
        />
      </div>
    </form>
  );
};

export default FormDetails;
