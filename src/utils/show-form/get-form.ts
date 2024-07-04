import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";

import { Dispatch, SetStateAction } from "react";

export async function getForm(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setForm: Dispatch<SetStateAction<any>>,
  formUUID: string,
  setQuestions: Dispatch<SetStateAction<any[]>>,
  setFormClosed: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  const axios = require("axios");
  const config = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/form/form/" + formUUID,
  };

  try {
    setLoading(true);
    let response = await axios.request(config);
    setForm(response.data.data.form);
    setQuestions(response.data.data.questions);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    if (error.response.data.message !== "Vet closed") {
      errorToast(
        "Error Fetching Vet",
        error?.response?.data?.message || error.message || "Failed To Fetch Vet"
      );
    } else {
      setFormClosed(true);
    }
    if (error?.response?.status === 401) {
      clearUserSession();
    }
  }
}
