"use client";
import ApplicationLogo from "@/components/application/application-logo";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import FormInput from "@/components/application/form-input";

export default function RegisterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const makeRequest = async () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/register";
    const axios = require("axios");
    let config = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: confirm_password,
        device_token: crypto.randomUUID(),
        device_type: "web",
      }),
    };

    // Start Loading Process
    setLoading(true);

    // Make Request
    try {
      const response = await axios.request(config);
      const userData = JSON.stringify({
        ...response.data[0].data.user,
        token: response.data[0].data.token,
      });
      Cookies.set("analogueshifts", userData);
      toast({
        variant: "default",
        title: "Account Created Successfully",
        description: "Reirecting you...",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      window.location.href = "/forms";
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again" onClick={makeRequest}>
            Try again
          </ToastAction>
        ),
      });
    }
  };

  function submit(e: any) {
    e.preventDefault();
    makeRequest();
  }

  useEffect((): any => {
    const auth = Cookies.get("analogueshifts");
    if (auth) {
      window.location.href = "/forms";
      return null;
    }
  }, []);

  return (
    <main className="w-full h-max min-h-screen mx-auto flex justify-center items-center px-5 py-10">
      {loading && <FormFallbackLoading />}
      <section className="max-w-full lg:w-[1000px] md:w-[800px]  flex justify-center items-center">
        <div className="lg:w-[450px] md:w-[350px] flex flex-col items-center">
          <ApplicationLogo />
          <form onSubmit={submit} className="pt-11 w-full flex flex-col">
            <p className="font-medium text-lg text-content-grayText pb-4">
              Welcome!
            </p>
            <p className="font-bold text-3xl text-[#292929] pb-5">
              Join our Community
            </p>
            <FormInput
              icon="fa-solid fa-signature"
              type="text"
              onChange={(e) => setName(e.target.value)}
              label="Name"
              placeholder="Name"
              value={name}
            />
            <FormInput
              icon="fa-solid fa-envelope"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter Email"
              value={email}
            />
            <FormInput
              icon="fa-solid fa-lock"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter Password"
              value={password}
            />
            <FormInput
              icon="fa-solid fa-lock"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Enter Password"
              value={confirm_password}
            />

            <button
              type="submit"
              className="w-full bg-background-lightYellow font-semibold text-base text-[#FDFAEF] flex items-center justify-center hover:bg-background-lightYellow/80 duration-300 h-12 rounded-2xl "
            >
              Create Account
            </button>
            <div className="w-full pt-4 flex justify-center items-center gap-1">
              <Link
                href="https://www.analogueshifts.com/forgot-password"
                className="font-normal cursor-pointer text-sm text-black/90"
              >
                Forgotten Password?
              </Link>
            </div>
            <div className="w-full pt-2 flex justify-center items-center gap-1">
              <p className="font-normal text-sm text-black/90">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="font-normal text-sm text-background-lightYellow"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
