"use client";
import { useState } from "react";
import Link from "next/link";
import FormFallbackLoading from "@/app/forms/components/fallback-loading";
import FormInput from "@/components/application/form-input";
import { errorToast } from "@/utils/toast";
import { useAuth } from "@/hooks/auth";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check If Password and Confirm Password Match
    if (password !== confirm_password) {
      errorToast("Bad Input", "Password Must Match with Confirm Password");
      return;
    }

    register({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: confirm_password,
      device_token: crypto.randomUUID(),
      setLoading,
    });
  };

  return (
    <>
      {loading && <FormFallbackLoading />}

      <form onSubmit={handleSubmit} className="pt-11 w-full flex flex-col">
        <p className="font-medium text-lg text-content-grayText pb-4">
          Welcome!
        </p>
        <p className="font-bold text-3xl text-[#292929] pb-5">
          Join our Community
        </p>
        <FormInput
          icon="fa-solid fa-signature"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          placeholder="First Name"
          value={firstName}
        />
        <FormInput
          icon="fa-solid fa-signature"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
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
          Sign Up
        </button>
        <div className="w-full pt-4 flex justify-center items-center gap-1">
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
    </>
  );
}
