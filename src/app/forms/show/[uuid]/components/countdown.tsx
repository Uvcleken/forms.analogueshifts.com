"use client";
import { formatTime } from "@/utils/show-form/helper-functions";
import { useEffect, useRef, useState } from "react";
import SubmitModal from "./submit-modal";

export default function Countdown({
  durationInMinutes,
  submitForm,
  setEmail,
  router,
  email,
  loading,
}: {
  durationInMinutes: number;
  submitForm: any;
  setEmail: any;
  router: any;
  email: string;
  loading: boolean;
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
      <SubmitModal
        submit={submitForm}
        email={email}
        setEmail={setEmail}
        loading={loading}
        open={timeup}
      />

      <p className="text-[15px] font-medium tablet:text-xs w-full  text-primary-boulder700 tablet:mt-2.5 mt-4">
        Time left: <b ref={countdownRef}></b>
      </p>
    </>
  );
}
