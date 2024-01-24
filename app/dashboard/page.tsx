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
import { MdOutlineModeEdit } from "react-icons/md";
import { set } from "zod";

export type businessdetails = {
  id: number;
  name: string | null;
  email: string | null;
  owner: string | null;
  about: string | null;
  created_at: string;
};

const RegisterPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setuser] = useState<any>("");
  const [newBusiness, setnewBusiness] = useState(false);
  const [editBusiness, seteditBusiness] = useState(false);
  const [id, setid] = useState(0);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [owner, setowner] = useState("");
  const [about, setabout] = useState("");
  const [created_at, setcreated_at] = useState("");

  const [business, setbusiness] = useState<businessdetails[]>([]);

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
      console.log("user ", user);
      console.log("user?.email ", user?.email);
      setowner(user?.email as string);
    };
    getUser();
  }, []);

  const LogOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCnacel = () => {
    setname("");
    setemail("");
    setabout("");
    setnewBusiness(false);
  };

  const handleEditCnacel = () => {
    setname("");
    setemail("");
    setabout("");
    seteditBusiness(false);
  };

  const getBusiness = async () => {
    try {
      let { data: business, error } = await supabase
        .from("business")
        .select("*");

      if (error) {
        toast.error("Error fetching data from Supabase!");
        return;
      }

      if (business) {
        console.log(business);
        setbusiness(business);
      }
    } catch (error) {
      toast.error("Error loading user data!");
    }
  };
  useEffect(() => {
    getBusiness();
  }, []);

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
      if (name.length > 20) {
        toast.error("name must be 20 characters maximum");
        return;
      }
      if (about.length < 3) {
        toast.error("about must be at least 3 characters");
        return;
      }
      if (about.length > 100) {
        toast.error("about must be less than 100 characters");
        return;
      }

      const { data, error } = await supabase
        .from("business")
        .insert([{ name, email, about, owner }]);

      if (error) {
        toast.error("Error fetching data from Supabase!");
        return;
      }

      let id = Math.floor(Math.random() * 1000000000);

      setname("");
      setemail("");
      setabout("");
      setnewBusiness(false);
      setbusiness([
        ...business,
        { id, name, email, about, created_at: new Date().toISOString(), owner },
      ]);
    } catch (error) {
      toast.error("Error loading user data!");
    }
  };

  const uploaEditBusuness = async () => {
    try {
      if (!validateEmail(email)) {
        toast.error("Invalid email");
        return;
      }
      if (name.length < 3) {
        toast.error("name must be at least 3 characters");
        return;
      }
      if (name.length > 20) {
        toast.error("name must be 20 characters maximum");
        return;
      }
      if (about.length < 3) {
        toast.error("about must be at least 3 characters");
        return;
      }
      if (about.length > 100) {
        toast.error("about must be less than 100 characters");
        return;
      }

      const { data, error } = await supabase
        .from("business")
        .update({ name, email, about })
        .eq("id", id)
        .select();

      if (error) {
        toast.error("Error fetching data from Supabase!");
        return;
      }

      setname("");
      setemail("");
      setabout("");
      seteditBusiness(false);
      getBusiness();
    } catch (error) {
      toast.error("Error updating business!");
    }
  };

  const deleteBusuness = async () => {
    try {
      const { data, error } = await supabase
        .from("business")
        .delete()
        .eq("id", id)

      if (error) {
        toast.error("Error fetching data from Supabase!");
        return;
      }

      setname("");
      setemail("");
      setabout("");
      seteditBusiness(false);
      getBusiness();
    } catch (error) {
      toast.error("Error deleting business!");
    }
  };

  if (!user) {
    return (
      <div className=" flex justify-center items-center w-screen h-screen bg-white text-black overflow-x-hidden">
        <div className="animate-bounce h-20">Loading ...</div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center w-screen h-screen bg-white">
      <button
        onClick={() => setnewBusiness(true)}
        className="absolute top-10 right-10 px-5 py-2 rounded-full font-sans  bg-gray-700 text-white text-sm hover:bg-slate-500 hover:font-semibold"
      >
        new business
      </button>
      {newBusiness && (
        <div className="z-10 bg-slate-100 bg-opacity-30 backdrop-blur-sm absolute top-0 right-0 h-screen w-screen flex items-center justify-center overflow-hidden">
          <div className="border border-gray-800 relative bg-opacity-60 backdrop-blur bg-gray-400 w-96 rounded-xl">
            <button
              onClick={handleCnacel}
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
              <div className="text-black font-bold mb-2">business mail</div>
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
      {editBusiness && (
        <div className="z-10 bg-slate-100 bg-opacity-30 backdrop-blur-sm absolute top-0 right-0 h-screen w-screen flex items-center justify-center overflow-hidden">
          <div className="border border-gray-800 relative bg-opacity-60 backdrop-blur bg-gray-400 w-96 rounded-xl">
            <button
              onClick={handleEditCnacel}
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
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className=" mt-4 mx-4">
              <div className="text-black font-bold mb-2">business mail</div>
              <input
                type="text"
                className=" border-gray-600 shadow bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:shadow-outline placeholder:text-gray-700 placeholder:text-sm
                "
                value={email}
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
                value={about}
                placeholder="commercial, industrial ..."
                onChange={(e) => setabout(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between  mt-8 mx-4 mb-10">
              <button
                onClick={uploaEditBusuness}
                className="bg-blue-400 hover:bg-blue-500 hover:font-semibold w-[49%] p-1 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={deleteBusuness}
                className="bg-red-400 hover:bg-red-500 hover:font-semibold w-[49%] p-1 rounded-lg"
              >
                Delete
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
      <div className="mt-48  w-[484px] overflow-x-hidden mb-36">
        {business.map((business) => (
          <div
            key={business.id}
            className="relative border border-gray-800 m-4 rounded-lg mb-4 bg-gray-100"
          >
            <div className="m-4">
              <div className="mb-3 flex flex-row justify-between">
                <div className="text-cyan-900 font-semibold p-2 font-sans">
                  Business name :
                </div>
                <div className="text-black font-sans py-2 px-4 rounded-full bg-slate-400">
                  {business.name}
                </div>
              </div>
              <div className="border-b border-gray-400 mb-3"></div>
              <div className="mb-3">
                <div>
                  <div className="text-cyan-900 font-semibold px-2 font-sans">
                    Business email :
                  </div>
                </div>
                <div className="text-black font-sans px-2 text-sm">
                  {business.email}
                </div>
              </div>
              <div className="mb-3">
                <div>
                  <div className="text-cyan-900 font-semibold px-2 font-sans">
                    About the business :
                  </div>
                </div>
                <div className="text-black font-sans px-2 text-sm">
                  {business.about}
                </div>
              </div>
              <div>
                <div>
                  <div className="text-cyan-900 font-semibold px-2 font-sans">
                    Creation date :
                  </div>
                </div>
                <div className="text-black font-sans px-2 text-sm">
                  {business.created_at.split("T")[0]}
                </div>
              </div>
            </div>
            {business.owner === user.email && (
              <button
                onClick={() => {
                  seteditBusiness(true);
                  setid(business.id as number);
                  setname(business.name as string);
                  setemail(business.email as string);
                  setabout(business.about as string);
                }}
                className="absolute bottom-5 right-5"
              >
                <MdOutlineModeEdit size="25" />
              </button>
            )}
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
