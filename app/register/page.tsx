"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useAppContext, AppProvider, User } from "../UserContext";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const context = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Handle registration logic here
    const validateEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;
      return emailRegex.test(email);
    };
    if (!validateEmail(email)) {
      console.log("Invalid email");
      toast.error("Invalid email");
      return;
    }
    if (password.length < 6) {
      console.log("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    console.log("email ", email);
    console.log("password ", password);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setPassword("");
    setEmail("");

    if (error) {
      console.log("error ", error);
      const errormsg = error?.message;
      toast.error(errormsg);
    }

    router.refresh();
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //   };
  //   getUser();
  // }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-96">
        <div className="mb-4">
          <div className="w-full text-black bg-slate-100 flex flex-row justify-between rounded-md mb-5">
            <Link
              href="/"
              className="bg-white text-center w-[53%] m-1 font-mono text-sm rounded-md hover:font-semibold hover:text-gray-800"
            >
              Sign in
            </Link>
            <button className="text-center w-[53%] m-1 font-mono text-sm rounded-md">
              Register
            </button>
          </div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:border-2 focus:border-lime-400 focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:border-2 focus:border-lime-400 focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            className="w-full bg-gray-900 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
