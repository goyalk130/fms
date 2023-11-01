"use client";
import React, { useEffect } from "react";
import "chart.js/auto";
import { Doughnut, PolarArea } from "react-chartjs-2";

const ChartWrapper = ({ classname, title, chartdata }) => {
  useEffect(() => {
  }, [chartdata]);
  if (chartdata.datasets[0].data[0] == 0) {
    return <></>;
  } else {
    return (
      <div
        className={` rounded-lg overflow-hidden bg-blue-50 gap-4  flex flex-col shadow-lg  ${classname}`}
      >
        <div className="bg-blue-200 w-full p-5 font-semibold text-lg tracking-wide  ">
          {title}
        </div>
        <div className="p-10 pt-0 w-full">
          <PolarArea type="line" data={chartdata} />
        </div>
      </div>
    );
  }
};

export default ChartWrapper;
