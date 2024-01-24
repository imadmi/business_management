"use client";
import Link from "next/link";
import React, { use, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { IoCloseCircleSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setuser] = useState<any>("");
  const [newNote, setnewNote] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [about, setabout] = useState("");
  const [created_at, setcreated_at] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/;
    return emailRegex.test(email);
  };

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


  const handleCnacel = async () => {
    setname("");
    setemail("");
    setabout("");
    setnewNote(false);
  };

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("business")
        .insert([
          { name: "someValue", email: "otherV@alue", about: "otherV@alue" },
        ])
        .select();

      // if (error) {
      //   toast.error("Error fetching data from Supabase!");
      //   return;
      // }

      // let { data: business, error } = await supabase
      //   .from("business")
      //   .select("*");

      // if (error) {
      //   toast.error("Error fetching data from Supabase!");
      //   return;
      // }

      // if (business) {
      //   console.log(business);
      // }
    } catch (error) {
      toast.error("Error loading user data!");
    }
  };

  const uploaNewBusuness = async () => {
    try {
      
      
      if (!validateEmail(email)) {
        toast.error("Invalid email");
        return;
      }
      if (name.length < 3) {
        toast.error("name must be at least 3 characters");
        return;
      }
      if (about.length < 3) {
        toast.error("about must be at least 3 characters");
        return;
      }
      
      const { data, error } = await supabase
      .from("business")
        .insert([{ name, email, about }]);

        if (error) {
          toast.error("Error fetching data from Supabase!");
          return;
        }


        setname("");
        setemail("");
        setabout("");
        setnewNote(false);
    } catch (error) {
      toast.error("Error loading user data!");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (!user) {
    return (
      <div className=" flex justify-center items-center w-screen h-screen bg-white text-black overflow-hidden">
        <div className="animate-bounce h-20">Louding ...</div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-white">
      <button
        onClick={() => setnewNote(true)}
        className="absolute top-10 right-10 px-5 py-2 rounded-full font-sans  bg-gray-700 text-white text-sm hover:bg-slate-500 hover:font-semibold"
      >
        new business
      </button>
      {newNote && (
        <div className="z-10 bg-slate-100 bg-opacity-30 backdrop-blur-sm absolute top-0 right-0 h-screen w-screen flex items-center justify-center overflow-hidden">
          <div className="border border-gray-800 relative bg-opacity-60 backdrop-blur bg-gray-400 w-96 rounded-xl">
            <button
              onClick={() => setnewNote(false)}
              className="absolute top-5 right-5 rounded-full "
            >
              <IoCloseCircleSharp
                size="30"
                className="text-gray-700 hover:text-gray-800"
              />
            </button>
            <div className="mt-14 mx-4">
              <div className="text-black font-bold mb-2">bussiness name</div>
              <input
                type="text"
                className=" border-gray-600 shadow bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:shadow-outline placeholder:text-gray-700 placeholder:text-sm
                "
                placeholder="business name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className=" mt-4 mx-4">
              <div className="text-black font-bold mb-2">Owner mail</div>
              <input
                type="text"
                className=" border-gray-600 shadow bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:shadow-outline placeholder:text-gray-700 placeholder:text-sm
                "
                placeholder="exemple@gmail.com"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className=" mt-4 mx-4">
              <div className="text-black font-bold mb-2">
                About the business
              </div>
              <input
                type="text"
                className=" border-gray-600 shadow bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:shadow-outline placeholder:text-gray-700 placeholder:text-sm
                "
                placeholder="commercial, industrial ..."
                onChange={(e) => setabout(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between  mt-8 mx-4 mb-10">
              <button
                onClick={uploaNewBusuness}
                className="bg-green-400 hover:bg-green-500 hover:font-semibold w-[49%] p-1 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={handleCnacel}
                className="bg-red-400 hover:bg-red-500 hover:font-semibold w-[49%] p-1 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={LogOut}
        className="absolute bottom-10 left-10 px-10 py-2 rounded-full font-sans  bg-gray-700 text-white text-sm  hover:bg-slate-500 hover:font-semibold"
      >
        Log out
      </button>
      <div className="absolute top-10 left-10">
        <div className=" font-mono text-slate-400">WELCOME!</div>
        <div className="font-bold text-xl text-gray-800 opacity-80 font-sans">
          {user.email}
        </div>
      </div>
      this is the dashboard page
      <Toaster />
    </div>
  );
};

export default RegisterPage;
