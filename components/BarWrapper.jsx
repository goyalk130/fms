"use client"
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarWrapper = ({title,datasets}) => {
    useEffect(() => {
      }, [datasets]);
      if (datasets?.datasets[0].data[0] == 0) {
        return <></>;
      } else {return (
    <div
      className={` rounded-lg overflow-hidden bg-blue-50 gap-4  flex flex-col shadow-lg  `}
    >
      <div className="bg-blue-200 w-full p-5 font-semibold text-lg tracking-wide  ">
        {title}
      </div>
      {datasets?.datasets[0].data[0] != 0 && (
        <div className="p-10 pt-0 w-full">
          <Bar data={datasets} />
        </div>
      )}
    </div>
  );}
};

export default BarWrapper;
