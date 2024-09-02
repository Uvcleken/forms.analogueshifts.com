"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import FormFallbackLoading from "../../components/fallback-loading";

import { useForms } from "@/hooks/forms";

export default function CreateForm() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [multiResponseSwitch, setMultiResponseSwitch]: any = useState(false);
  const [isTimeout, setIsTimeOut] = useState(false);
  const [timeout, setTimeoutValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const router = useRouter();

  const { createForm } = useForms();

  const handleDateInputChange = (event: any) => {
    setDeadline(event.target.value);
    const dateObject = new Date(event.target.value);
    if (!isNaN(dateObject.getTime())) {
      const formatted = dateObject.toISOString().slice(0, 19).replace("T", " ");
      setFormattedDate(formatted);
    } else {
      setFormattedDate("Invalid Date");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createForm({
      title,
      description,
      router,
      deadline: isTimeout ? formattedDate : null,
      timeout: isTimeout ? timeout : null,
      multi_response: multiResponseSwitch,
      setLoading,
    });
  };

  return (
    <main className="large:mt-[124px] mt-24 w-full max-w-[1400px] px-7 sm:px-[100px] large:px-[130px] mx-auto">
      {" "}
      <div className="w-full flex flex-wrap gap-x-5 gap-y-5 bg-[#FEFEFE]  border border-[#E7E7E7] px-4 lg:px-10 py-7 rounded-3xl">
        {loading && (
          <>
            <FormFallbackLoading />
          </>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-wrap gap-x-5 gap-y-5"
        >
          {" "}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g “Getting to know you”"
              className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-darkYellow"
            />
          </div>
          {/* Description */}
          <div className="w-full flex flex-col gap-3">
            <p className="text-sm font-normal text-primary-boulder400">
              DESCRIPTION
            </p>
            <div className="w-full">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-[13px] outline-1 outline-background-darkYellow w-full h-36 py-5 rounded-2xl px-5 border border-primary-boulder200 font-normal placeholder:text-primary-boulder300 text-primary-boulder950"
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
          {/* TimeOut And DeadLine */}
          {isTimeout && (
            <>
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-3">
                <p className="text-sm font-normal text-primary-boulder400">
                  TIME OUT (In Minutes)
                </p>
                <input
                  type="number"
                  value={timeout}
                  onChange={(e) => setTimeoutValue(e.target.value)}
                  className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-darkYellow"
                />
              </div>
              <div className="w-full md:w-[calc(50%-10px)] flex flex-col gap-3">
                <p className="text-sm font-normal text-primary-boulder400">
                  DEADLINE
                </p>
                <input
                  required
                  type="datetime-local"
                  value={deadline}
                  onChange={handleDateInputChange}
                  className="max-w-full w-full h-14 rounded-2xl  px-5 border border-primary-boulder200 text-[13px] font-light placeholder:text-primary-boulder300 text-primary-boulder950 outline-1 outline-background-darkYellow"
                />
              </div>
            </>
          )}
          {/* Submit Button */}
          <div className=" flex w-full">
            <input
              value="Create Vet"
              type="submit"
              className={`px-10 text-[#FEFEFE] text-base duration-300 hover:scale-105 font-normal flex items-center gap-2 h-12 bg-background-darkYellow rounded-full border-none cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
