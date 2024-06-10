"use client";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearUserSession } from "@/helper-functions/clear-user-session";
import { successToast } from "@/helper-functions/success-toast";
import { errorToast } from "@/helper-functions/error-toast";

interface FormDetailsProps {
  details: any;
  setLoading: any;
  userToken: string;
  getResponse: any;
}

const ResponseDetails: React.FC<FormDetailsProps> = ({
  details,
  setLoading,
  userToken,
  getResponse,
}) => {
  const [score, setScore] = useState(details.score || "");
  const axios = require("axios");

  const updateScore = async () => {
    const config = {
      method: "PUT",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/score/update/" +
        details.uuid,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      data: { score: score },
    };

    try {
      setLoading(true);
      await axios.request(config);
      await getResponse();
      successToast("Score updated!", "Your score has been updated.");
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Failed to update score",

        error?.response?.data?.message ||
          error.message ||
          "Failed To update Score"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return (
    <div className="w-full flex justify-between flex-wrap gap-3 bg-[#FEFEFE] border border-[#E7E7E7] px-4 lg:px-10 py-7 rounded-xl h-max  border-t-8 border-t-background-lightYellow">
      <h1 className="text-4xl w-full mt-1.5 mb-3  text-primary-boulder950 font-semibold">
        Form Response
      </h1>
      <div className="w-full border-b border-dotted"></div>
      <span className="text-lg  truncate text-primary-boulder700">
        Email: <small>{details.email}</small>
      </span>
      <div className="  flex items-center gap-3">
        <span className="text-lg text-primary-boulder700">
          Score:{" "}
          {details.score ? (
            <small>
              <b>{details.score}</b>
            </small>
          ) : (
            <small>Not Scored</small>
          )}
        </span>

        <Dialog>
          <DialogTrigger asChild>
            <Edit
              width={18}
              className=" text-primary-boulder700 cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-primary-boulder950">
                Score candidate
              </DialogTitle>
              <DialogDescription className="text-primary-boulder500">
                Make changes to this candidate&apos;s score. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right text-primary-boulder950"
                >
                  Score
                </Label>
                <Input
                  id="name"
                  defaultValue={score}
                  value={score}
                  onChange={(e: any) => setScore(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <span
                  onClick={updateScore}
                  className="bg-background-lightYellow hover:bg-background-lightYellow/80 text-background-white300 px-5 py-2 rounded cursor-pointer text-sm"
                >
                  Save changes
                </span>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResponseDetails;
