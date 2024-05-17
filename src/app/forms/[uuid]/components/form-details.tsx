"use client";
import { useState, useEffect, FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import FormFallbackLoading from "../../components/fallback-loading";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { useToast } from "@/components/ui/use-toast";

interface FormDetailsProps {
  title: string;
  description: string;
  timeout: string;
  multiResponse: string;
  deadline: string;
  user: any;
  uuid: string;
}

const convertDateFormat = (date: string) => {
  const dateStr = date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const formatted = `${dateStr} 00:00:00`;
    return formatted;
  } else {
    return "";
  }
};

const FormDetails: React.FC<FormDetailsProps> = ({
  title,
  description,
  timeout,
  multiResponse,
  deadline,
  user,
  uuid,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [multiResponseSwitch, setMultiResponseSwitch]: any = useState(
    multiResponse === "1" ? true : false
  );
  const [timeoutValue, setTimeoutValue] = useState(parseInt(timeout) || "");
  const [deadlineValue, setDeadlineValue] = useState(
    deadline[0] ? convertDateFormat(deadline) : ""
  );

  const handleUpdateForm = async (e: any) => {
    e.preventDefault();
    const axios = require("axios");
    let config = {
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form/update/${uuid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      data: {
        title: titleValue,
        timeout: String(timeoutValue).trim().length > 0 ? timeoutValue : null,
        deadline: deadlineValue,
        multi_response: multiResponseSwitch ? "1" : "0",
        description: descriptionValue,
      },
    };
    setLoading(true);
    try {
      await axios.request(config);
      setLoading(false);
      toast({
        variant: "default",
        title: "Form updated",
        description: "Your form has been updated successfully",
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error updating your form",
        description: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleUpdateForm}
      className="w-full flex flex-wrap gap-x-5 gap-y-5 bg-[#FEFEFE]  border border-[#E7E7E7] px-4 lg:px-10 py-7 rounded-3xl"
    >
      {loading && (
        <>
          <FormFallbackLoading />
        </>
      )}
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
        <p className="text-sm font-normal text-primary-boulder400">DEADLINE</p>
        <input
          required
          type="datetime-local"
          value={deadlineValue}
          onChange={(e: any) => setDeadlineValue(e.target.value)}
          className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-lightYellow"
        />
      </div>
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
