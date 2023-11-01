"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

const NavBar = ({ className }) => {
  const router = useRouter();

  return (
    <div
      className={`bg-white h-screen w-1/12 flex flex-col shadow-lg ${className}`}
    >
      <div className=" font-bold  text-center p-5 text-xl bg-blue-50 border-b-[1px] border-solid border-gray-400">
        CHALKPAD-<span className="text-blue-500">2.0.</span>
      </div>
      <div className=" flex-grow-0 border-slate-300 "></div>
      <div className="flex flex-col pt-10  border-solid border-slate-300 pl-14 flex-grow-0 justify-between text-xl gap-14" >
        <div>
          <h3 className="cursor-pointer flex gap-2 items-center hover:text-blue-400">
            <HomeIcon/>
            <Link href={"/dashboard"}>Home</Link>
          </h3>
        </div>
        <div>
          <h3 className="cursor-pointer flex gap-2 items-center hover:text-blue-400">
          <SupervisedUserCircleIcon/>
            <Link href={"/dashboard/faculty"}>Faculty</Link>
          </h3>
        </div>
        <div>
          <h3 className="cursor-pointer flex gap-2 items-center hover:text-blue-400">
          <PersonIcon/>
            <Link href={"/dashboard/student"}>Student</Link>
          </h3>
        </div>
        <div>
          <h3 className="cursor-pointer flex gap-2 items-center hover:text-blue-400">
          <SchoolIcon/>
            <Link href={"/dashboard/class"}>Class</Link>
          </h3>
        </div>
        {/* <div>
          <h3 className="cursor-pointer flex gap-2 items-center hover:text-blue-400">
            <Link href={"/dashboard/faculty"}>Attdendance</Link>
          </h3>
        </div> */}
        {/* <div>
          <h3 className="cursor-pointer" onClick={()=>{
              router.push("/dashboard/faculty")
          }}>Assignment</h3>
        </div> */}
      </div>
      <div className="flex-grow border-solid border-slate-300"></div>
      
    </div>
  );
};

export default NavBar;
