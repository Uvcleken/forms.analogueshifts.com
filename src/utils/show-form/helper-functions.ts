import { errorToast } from "../error-toast";

export function checkValidEmail(email: string) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

// Function to format time as mm:ss
export const formatTime = (s: any) => {
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const handleStartTimer = (
  email: string,
  form: any,
  setTimeOutModal: any,
  setTimeOutMinutes: any
) => {
  if (checkValidEmail(email)) {
    let timeOutMinutes = parseInt(form.timeout);
    setTimeOutModal(false);
    setTimeOutMinutes(timeOutMinutes);
  } else {
    errorToast("Invalid Email", "Must provide a valid email");
  }
};

export function checkAllQuestionFields(questions: any, toast: any) {
  let returnValue = true;
  questions.forEach((item: any) => {
    if (
      (item.required === "1" && item.answer === null) ||
      (item.required === "1" && item.answer !== null && !item.answer[0])
    ) {
      returnValue = false;
      toast("Missing Field", item.question);
    }
  });

  return returnValue;
}
