import { successToast } from "../success-toast";
import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";

export const createForm = async (
  user: any,
  title: string,
  timeout: any,
  formattedDate: any,
  setLoading: any,
  description: string,
  multiResponseSwitch: boolean,
  router: any
) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/form/create";
  const axios = require("axios");
  const config = {
    method: "POST",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    data: {
      title: title,
      timeout: timeout,
      deadline: formattedDate,
      multi_response: multiResponseSwitch,
      description: description,
    },
  };
  try {
    setLoading(true);
    const response = await axios.request(config);
    if (response.data.success) {
      successToast(
        "Form created successfully",
        "Reirecting you to the Created Form"
      );
      router.push("/forms/" + response.data.data.form.uuid);
    }
  } catch (error: any) {
    errorToast(
      "Error Creating Form",
      error?.response?.data?.message || error.message || "Failed To Create Form"
    );
    setLoading(false);
    if (error?.response?.status === 401) {
      clearUserSession();
    }
  }
};
