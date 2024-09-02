import axios from "@/lib/axios";

import Cookies from "js-cookie";
import { useUser } from "@/contexts/user";
import { useToast } from "@/contexts/toast";
import { useRouter } from "next/navigation";

import { clearUserSession } from "@/utils/clear-user-session";

interface GetUserParams {
  setLoading: (loading: boolean) => void;
  layout: string;
  token: string;
}

interface LogoutParams {
  setLoading: (loading: boolean) => void;
}

export const useAuth = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const { notifyUser }: any = useToast();

  const validateApp = async ({ appToken }: { appToken: string }) => {
    let RedirectionLink = Cookies.get("RedirectionLink");
    try {
      const response = await axios.request({
        url: "/app/callback/" + appToken,
        method: "GET",
      });
      if (response.data?.success) {
        Cookies.set("analogueshifts", response.data?.data.token);
        notifyUser("success", "success", "right");
        window.location.href = RedirectionLink || "/";
      }
    } catch (error: any) {
      notifyUser("error", error.messsage || "Invalid Request", "right");
      router.push(RedirectionLink || "/");
      console.log(error);
    }
  };

  const getUser = async ({ setLoading, layout, token }: GetUserParams) => {
    setLoading(true);
    try {
      const response = await axios.request({
        url: "/user",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      setUser(response.data);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 401 && layout !== "guest") {
        clearUserSession();
      }
    }
  };

  const logout = async ({ setLoading }: LogoutParams) => {
    Cookies.remove("analogueshifts");
    router.push("/");
  };

  return {
    logout,
    getUser,
    validateApp,
  };
};
