import { errorToast } from "../error-toast";
import { successToast } from "../success-toast";
import { clearUserSession } from "../clear-user-session";

export const convertDateFormat = (date: string) => {
  const dateStr = date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const formatted = `${dateStr} 00:00:00`;
    return formatted;
  } else {
    return "";
  }
};

export interface FormDetailsProps {
  title: string;
  description: string;
  timeout: string;
  multiResponse: string;
  deadline: string;
  user: any;
  uuid: string;
}

export const updateForm = async (
  user: any,
  uuid: string,
  titleValue: string,
  timeoutValue: any,
  deadlineValue: any,
  multiResponseSwitch: boolean,
  descriptionValue: string,
  setLoading: any
) => {
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
      timeout: timeoutValue,
      deadline: deadlineValue,
      multi_response: multiResponseSwitch ? "1" : "0",
      description: descriptionValue,
    },
  };
  setLoading(true);
  try {
    await axios.request(config);
    setLoading(false);
    successToast("Form updated", "Your form has been updated successfully");
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Error updating your form",
      error?.response?.data?.message || error.message || "Failed To update Form"
    );
    if (error?.response?.status === 401) {
      clearUserSession();
    }
  }
};
