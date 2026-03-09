import { clearUserSession } from "../clear-user-session";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const submitResponse = async (
  questions: any,
  formUUID: string,
  email: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setFormSubmitted: Dispatch<SetStateAction<boolean>>,
  notifyUser: any
) => {
  const answers: any[] = [];

  questions?.forEach((item: any) => {
    answers.push({
      question_uuid: item.uuid,
      answer: JSON.stringify(item.answer),
    });
  });

  const config = {
    method: "POST",
    url:
      process.env.NEXT_PUBLIC_BACKEND_URL +
      "/tools/form/store/answers/" +
      formUUID +
      "?email=" +
      email,
    data: {
      email: email,
      responses: answers,
    },
  };
  try {
    setLoading(true);
    await axios.request(config);
    setLoading(false);
    setFormSubmitted(true);
  } catch (error: any) {
    notifyUser(
      "error",
      error?.response?.data?.message,
      error?.response?.data?.data?.message || error.message,
      "right"
    );
    setLoading(false);
    if (error?.response?.status === 401) {
      clearUserSession();
    }
  }
};
