import axios from "@/lib/axios";

import Cookies from "js-cookie";

import { successToast, errorToast } from "@/utils/toast";
import { clearUserSession } from "@/utils/clear-user-session";

interface GetFormsParams {
  setLoading: (loading: boolean) => void;
  url: string;
  setData: any;
  setCurrentPageInfo: any;
}

interface GetFormParams {
  setLoading: (loading: boolean) => void;
  uuid: string;
  setData: (response: any) => void;
}

interface DeleteFormParams {
  setLoading: (loading: boolean) => void;
  setForms?: any;
  setCurrentPageInfo?: any;
  id: string;
  getFormsUrl: string | null;
}

interface CreateFormParams {
  setLoading: (loading: boolean) => void;
  title: string;
  timeout: any;
  deadline: any;
  multi_response: boolean;
  description: string;
  router?: any;
}

interface UpdateFormParams {
  setLoading: (loading: boolean) => void;
  title: string;
  timeout: any;
  deadline: any;
  multi_response: boolean;
  description: string;
  uuid: string;
}

interface GetResponsesParams {
  uuid: string;
  setData: any;
}

export const useForms = () => {
  const token = Cookies.get("analogueshifts");

  const getForms = async ({
    setLoading,
    url,
    setData,
    setCurrentPageInfo,
  }: GetFormsParams) => {
    setLoading(true);
    try {
      const response = await axios.request({
        method: "GET",
        url: url,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setCurrentPageInfo(response?.data?.data?.forms);
      setData(response?.data?.data?.forms?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Uh oh! Error fetching vets.",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Vets"
      );
      if (error.response.status === 401) {
        clearUserSession();
      }
    }
  };

  const deleteForm = async ({
    setLoading,
    setForms,
    setCurrentPageInfo,
    getFormsUrl,
    id,
  }: DeleteFormParams) => {
    setLoading(true);
    try {
      await axios.request({
        method: "DELETE",
        url: `/tools/form/delete/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (getFormsUrl !== null) {
        await getForms({
          setLoading,
          url: getFormsUrl,
          setData: setForms,
          setCurrentPageInfo,
        });
      } else {
        setLoading(false);
      }

      successToast("Vet deleted", "Your vet has been deleted successfully");
    } catch (error: any) {
      errorToast(
        "Uh oh! Error deleting vet.",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Delete Vet"
      );
      setLoading(false);
      if (error.response.status === 401) {
        clearUserSession();
      }
    }
  };

  const createForm = async ({
    setLoading,
    title,
    timeout,
    deadline,
    multi_response,
    description,
    router,
  }: CreateFormParams) => {
    setLoading(true);
    try {
      const response = await axios.request({
        method: "POST",
        url: "/tools/form/create",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          title,
          timeout,
          deadline,
          multi_response,
          description,
        },
      });
      if (response.data.success) {
        successToast(
          "Form created successfully",
          "Reirecting you to the Created Vet"
        );
        router.push("/forms/" + response.data.data.form.uuid);
      }
    } catch (error: any) {
      errorToast(
        "Error Creating Form",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Create Vet"
      );
      setLoading(false);
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const updateForm = async ({
    setLoading,
    title,
    timeout,
    deadline,
    multi_response,
    description,
    uuid,
  }: UpdateFormParams) => {
    setLoading(true);
    try {
      const response = await axios.request({
        method: "PUT",
        url: `/tools/form/update/${uuid}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          title,
          timeout,
          deadline,
          multi_response,
          description,
        },
      });
      if (response.data.success) {
        setLoading(false);
        successToast("Vet updated", "Your vet has been updated successfully");
      }
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Error updating your form",
        error?.response?.data?.message ||
          error.message ||
          "Failed To update Vet"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const getForm = async ({ setLoading, uuid, setData }: GetFormParams) => {
    setLoading(true);
    try {
      const response = await axios.request({
        method: "GET",
        url: "/tools/form/" + uuid,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response);
      setLoading(false);
    } catch (error: any) {
      errorToast(
        "Error Fetching your Form",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Form"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const getResponses = async ({ uuid, setData }: GetResponsesParams) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "/tools/form/responses/" + uuid,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data.data.response);
    } catch (error: any) {
      errorToast(
        "Error Fetching your Form Responses",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Form Responses"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return {
    getForms,
    deleteForm,
    createForm,
    getForm,
    getResponses,
    updateForm,
  };
};
