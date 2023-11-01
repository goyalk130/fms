import React from "react";

const AddUser = () => {
  return (
    <div className="bg-gray-50  flex justify-center flex-col items-center h-screen">
    <div className="shadow-md rounded-lg p-20">
      <div className="font text-center">
        <h1 className="text-4xl font-bold text-green-500 pb-9">Add-User</h1>
      </div>
      <div className="text-center">
        <div>
          <label for="user-ID"></label>
          <input type="text" name="User-ID" className="border-black border-solid border-2 m-4 p-2 rounded-lg"placeholder="User-ID"></input>
        </div>
        <div>
          <label for="name"></label>
          <input type="text" name="name" className="border-black border-solid border-2 m-4 p-2 rounded-lg" placeholder="Name"></input>
        </div>
        <div>
          <label for="password"></label>
          <input type="password" name="password" className="border-black border-solid border-2 m-4 p-2 rounded-lg" placeholder="••••••••"></input>
        </div>
        </div>
        <button type="submit" className="border-black border-solid border-2 m-4 p-1 w-36 shadow-md font-semibold bg-green-500 text-white border-none rounded-lg text-center w-11/12 ">Add</button>
      </div>
    </div>
  );
};

export default AddUser;
