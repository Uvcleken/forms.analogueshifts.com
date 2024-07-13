import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user";
import Cookies from "js-cookie";
import { successToast } from "@/utils/toast";
import { errorToast } from "@/utils/toast";
import { clearUserSession } from "@/utils/clear-user-session";

interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_token: string;
  setLoading: (loading: boolean) => void;
}

interface LoginParams {
  email: string;
  password: string;
  setLoading: (loading: boolean) => void;
}

interface GetUserParams {
  setLoading: (loading: boolean) => void;
  layout: string;
}

interface LogoutParams {
  setLoading: (loading: boolean) => void;
}

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const token = Cookies.get("analogueshifts");

  const authConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      secret_key: process.env.NEXT_PUBLIC_SECRET_KEY!,
    },
  };

  const register = async ({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    device_token,
    setLoading,
  }: RegisterParams) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/register",
        {
          first_name,
          last_name,
          email,
          password,
          password_confirmation,
          device_token,
        },
        authConfig
      );
      Cookies.set("analogueshifts", response?.data[0]?.data?.token);
      setUser(response?.data[0]?.data?.token);

      successToast(
        "Account created successfully",
        "Redirecting You to your Dashboard."
      );
      router.push("/forms");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Failed To create Account",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Create Account"
      );
    }
  };

  const login = async ({ email, password, setLoading }: LoginParams) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        authConfig
      );
      Cookies.set("analogueshifts", response.data.data.token);
      setUser(response.data.data.user);
      successToast("Login Successful", "Redirecting You to your Dashboard.");

      router.push("/forms");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Failed To Login",
        error?.response?.data?.message || error.message || "Failed To Login"
      );
    }
  };

  const getUser = async ({ setLoading, layout }: GetUserParams) => {
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
    const url = "/logout";

    const config = {
      url: url,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    setLoading(true);

    try {
      await axios.request(config);
      Cookies.remove("analogueshifts");
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      errorToast("Error", error.message);
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return {
    register,
    login,
    logout,
    getUser,
  };
};
