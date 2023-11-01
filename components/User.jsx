import React from "react";
import { signOut, useSession } from "next-auth/react";


const User = ({ user }) => {
  const { data: session } = useSession();
  return (
    <div className="flex h-20 items-center shadow-sm p-4 sticky">
      <div className="flex flex-grow items-center"></div>
      <div className="flex w-fit gap-4 items-center">
        <h1 className="font-semibold">{"Karan Goyal"}</h1>
        <button
          className="bg-blue-400 rounded-md h-8 text-sm text-white font-bold px-2"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
        <img
          className="w-10 aspect-square rounded-full shadow-lg"
          src="/faculty.jpg"
        />
      </div>
      
    </div>
  );
};

export default User;
