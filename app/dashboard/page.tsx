"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const RegisterPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setuser] = useState<any>("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setuser(user);
    };
    getUser();
  }, []);

  const LogOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className=" flex justify-center items-center w-screen h-screen bg-white text-black overflow-hidden">
        <div className="animate-bounce h-20">Louding ...</div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-white">
      <button className="absolute top-10 right-10 px-5 py-2 rounded-full font-sans  bg-gray-700 text-white text-sm hover:bg-slate-500 hover:font-semibold">
        new business
      </button>
      <button
        onClick={LogOut}
        className="absolute bottom-10 left-10 px-10 py-2 rounded-full font-sans  bg-gray-700 text-white text-sm  hover:bg-slate-500 hover:font-semibold"
      >
        Log out
      </button>
      <div className="absolute top-10 left-10">
        <div className=" font-mono text-slate-400">WELCOME!</div>
        <div className="font-bold text-xl text-gray-800 opacity-80 font-sans">{user.email}</div>
      </div>
      this is the dashboard page
    </div>
  );
};

export default RegisterPage;
