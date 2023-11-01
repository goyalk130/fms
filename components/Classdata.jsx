"use client";
import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BarWrapper from "./BarWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Classdata = ({ classdata = [] }) => {
  const router = useRouter();

  const [rendered, setrendered] = useState(false);
  const [chartdata, setchartdata] = useState({
    labels: ["Faculty", "Students"],
    datasets: [
      {
        id: 1,
        label: ["Count"],
        data: [0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (classdata[0]?.faculty != undefined) {
      setchartdata((value) => {
        let clsss = classdata[0];
        value.datasets[0].data[0] = classdata[0]?.faculty.length;
        value.datasets[0].data[1] = classdata[0]?.student.length;
        return { ...value };
      });
      setrendered(true);
    }
  }, [classdata]);
  return (
    <div className="h-full w-full flex flex-col gap-5 p-5">
      <div className="w-full  h-2/5 rounded-lg flex flex-col gap-5 shadow-lg">
        <div className="bg-blue-100 w-full h-full rounded-lg overflow-hidden">
          <div className=" relative w-full h-full flex justify-center items-center backdrop-blur-xl">
            <img
              className="w-full z-0 absolute backdrop-blur-lg"
              src="/class.jpg"
            />
            <div className="w-full flex justify-center items-center z-10 h-full backdrop-blur-sm ">
              <h1 className="text-7xl font-bold tracking-wider ">
                {classdata[0]?.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 p-5 rounded-lg">
        <div className="w-full flex gap-5">
          <div className="w-1/3 gap-5">
            {rendered ? (
              <BarWrapper datasets={chartdata} title={"course classes"} />
            ) : (
              <div className="w-full bg-blue-100 rounded-lg overflow-hidden h-32"></div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl text-blue-500 font-bold">Faculty :</h1>
              {classdata[0]?.faculty.length != 0 &&
                classdata[0]?.faculty.map((ele) => {
                  return <h2 className="pl-5 text-xl">{ele.name}</h2>;
                })}
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl text-blue-500 font-bold pr-5">Faculty :</h1>
              {classdata[0]?.student.length != 0 &&
                classdata[0]?.student.map((ele) => {
                  return <h2 className=" text-xl">{ele.name}</h2>;
                })}
            </div>
            <div>
              <button
                onClick={() => {
                  router.push(`/dashboard/class/${classdata[0]?.id}/timetable`);
                }}
                className=" bg-green-400 px-2 rounded-md text-white h-8 text-sm font-semibold tracking-wider"
              >
                TimeTable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Classdata);
