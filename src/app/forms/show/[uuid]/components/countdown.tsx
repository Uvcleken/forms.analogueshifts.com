"use client";
import {
  formatTime,
  checkValidEmail,
} from "@/utils/show-form/helper-functions";
import { useEffect, useRef, useState } from "react";
import { errorToast } from "@/utils/toast";
import IdiomProof from "@/components/application/idiom-proof";

export default function Countdown({
  durationInMinutes,
  submitForm,
  setEmail,
  router,
  email,
}: {
  durationInMinutes: number;
  submitForm: any;
  setEmail: any;
  router: any;
  email: string;
}) {
  const countdownRef: any = useRef(null);
  const [timeup, setTimeUp] = useState(false);

  useEffect(() => {
    const endTime = new Date().getTime() + durationInMinutes * 60000;

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(intervalId);
        countdownRef.current.innerHTML = "TIMEOUT";
        setTimeUp(true);
        return;
      }

      const seconds = Math.floor(distance / 1000);
      countdownRef.current.innerHTML = formatTime(seconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [durationInMinutes]);

  return (
    <>
      {/* <IdiomProof
        open={timeup}
        emailValue={email}
        description={`Your Time is Up. Please Confirm Your Submition Email and Submit.`}
        title="TimeUp"
        label="Submit Response"
        action={() => {
          if (checkValidEmail(email)) {
            submitForm();
            setTimeUp(false);
          } else {
            errorToast("Invalid Email", "Must provide a valid email");
          }
        }}
        close={() => {
          router.back();
        }}
        emailInput={true}
        onChangeEmailValue={(value: string) => setEmail(value)}
      /> */}
      <p className="text-base w-full  text-primary-boulder700 mt-4">
        Time Left: <b ref={countdownRef}></b>
      </p>
    </>
  );
}
