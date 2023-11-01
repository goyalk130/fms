"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline, MdPerson } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [userid, setuserid] = useState("");
  const [pass, setpass] = useState("");
  const [type, settype] = useState("");
  const [state, setstate] = useState(false)

  const session = useSession();
  const router = useRouter()
  useEffect(() => {
  if (session.status === "authenticated") {
    router.push("/dashboard");
  }else{
  }
  }, [state])


  function loginuser(e) {
    e.preventDefault();
    signIn("credentials", {
      userid,
      pass,
      usertype: type.toLowerCase(),
      redirect: false,
    }).then((data) => {
      setstate(true)
      router.replace("/dashboard")
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex  w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold" text-green-500 mb-6></div>
            <div py-10>
              <h2 className="text-3xl font-bold text-blue-500 mb-3 mt-10">
                Log in to Account
              </h2>

              <div className="border-2 w-10  border-blue-500 inline-block mb-6"></div>
              {/* input feild */}
              <form onSubmit={loginuser} className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    onChange={(e) => {
                      setuserid(e.target.value);
                    }}
                    value={userid}
                  />
                </div>

                {/* password feild */}
                <div className="bg-gray-100 w-64 p-2 flex items-center my-3">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    name="email"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    onChange={(e) => {
                      setpass(e.target.value);
                    }}
                    value={pass}
                  />
                </div>

                {/* dropdown */}
                <div className="bg-gray-100 w-64 p-2 flex items-center my-3">
                  <MdPerson className="text-gray-400 mr-2" />
                  {/* <input type='password' name='email' placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1' /> */}
                  {/* <label for="role">Select</label> */}
                  <select
                    id="role"
                    className="bg-gray-100 w-full text-gray-400 outline-none"
                    onChange={(e) => {
                      settype(e.target.value);
                    }}
                    value={type}
                  >
                    <option defaultChecked className="text-gray-400 ">Admin</option>
                    <option className="text-gray-400 ">Faculty</option>
                    <option className="text-gray-400 ">Student</option>
                  </select>
                </div>

                <button
                  href="#"
                  className="border-2 border-green text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white mt-4"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
          <div className="w-2/5 bg-blue-400 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Chalkpad 2.0</h2>
            <div className="border-2 w-10  border-white inline-block mb-2"></div>
            <p className="mb-10">
              {" "}
              Fill up personal information and start journey with us.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
