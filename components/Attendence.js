import React from "react";

const Attendence = () => {
  return (
    <div className=" h-screen ">
      <div className="inline-block  flex flex-row w-5/6 justify-evenly shadow-md items-center  mt-12 ml-6 rounded-lg">
        <div className="p-7 ">
          <h1>2110990639</h1>
        </div>
        <div className="p-7">
          <h1>karan goyal</h1>
        </div>
        <div className="p-7">
          <h1>2-oct-2023</h1>
        </div>
        <div className="p-7">
          <h1>8pm to 9pm</h1>
        </div>
        <div className="p-7">
          <h1>cloud-computing</h1>
        </div>
        <div classname="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44  p-7">
          <select
            name="attendence"
            class="py-2 text-sm text-gray-700  h-full w-32"
          >
            <option
              value="p"
              class=" px-4 py-2 w-16 text-clip"
            >
              Present
            </option>
            <option value="a" class="px-4 py-2  w-16">
              Absent
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Attendence;
