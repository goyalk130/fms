"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import User from "components/User";
import React, { useEffect, useState } from "react";
import ChartWrapper from "components/ChartWrapper";
import BarWrapper from "components/BarWrapper";
import FacultyCard from "components/FacultyCard";

import axios from "axios";
import "chart.js/auto";

const DashBoard = () => {
  const { data: session } = useSession();

  const [users, setusers] = useState([0, 0, 0]);
  const [classCourse, setclassCourse] = useState([0, 0]);
  const [datarecieved, setdatarecieved] = useState(false);
  const [userDataSet, setuserDataSet] = useState({
    labels: ["Admin", "Faculty", "Students"],
    datasets: [
      {
        id: 1,
        label: "Count",
        data: [0, 0, 0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  });
  const [classCourseData, setclassCourseData] = useState({
    labels: ["Course", "Class"],
    datasets: [
      {
        id: 1,
        label: "Count",
        data: [0, 0],
        backgroundColor: ["rgb(255, 205, 86)", "rgb(54, 162, 235)"],
      },
    ],
  });
  const [All, setAll] = useState({
    labels: ["Admin", "Faculty", "Students", "Courses", "Classes"],
    datasets: [
      {
        id: 1,
        label: "Count",
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  });
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/data/count").then((data) => {
      setusers((value) => {
        value[0] = data.data.data.Admin._count || 0;
        value[1] = data.data.data.Faculty._count || 0;
        value[2] = data.data.data.Student._count || 0;
        setuserDataSet((pre) => {
          pre.datasets[0].data = value;

          return { ...pre };
        });
        return value;
      });
      setclassCourse((value) => {
        value[0] = data.data.data.Course._count || 0;
        value[1] = data.data.data.Class._count || 0;
        if (classCourse[0] != 0 && classCourse[1] != 0) {
          setclassCourseData((pre) => {
            pre.datasets[0].data = value;

            return { ...pre };
          });
        }
        return value;
      });
    });
    setdatarecieved(true);
  }, []);

  useEffect(() => {
    setAll((pre) => {
      pre.datasets[0].data[0] = users[0];
      pre.datasets[0].data[1] = users[1];
      pre.datasets[0].data[2] = users[2];
      pre.datasets[0].data[3] = classCourse[0];
      pre.datasets[0].data[4] = classCourse[1];
      return { ...pre };
    });
  }, [userDataSet, classCourseData]);

  if (session != null) {
    return (
      <div className="flex flex-col w-11/12 h-screen overflow-hidden">
        <User />
        <div className="bg-slate-50 p-10 gap-5 flex w-full h-full flex-col overflow-y-scroll overflow-x-hidden">
          <div className="flex gap-5 flex-row w-full">
            <div className="w-3/5 gap-5 h-screen flex flex-wrap">
              <div className="flex-grow w-2/5">
                {datarecieved ? (
                  <ChartWrapper
                    classname={""}
                    title={"Users"}
                    chartdata={userDataSet}
                  />
                ) : (
                  <div className="rounded-lg overflow-hidden bg-blue-100  gap-5 justify-center items-center text-3xl font-bold  flex flex-col shadow-lg text-gray-500 h-3/6">
                    Loading...
                  </div>
                )}
              </div>

              <div className="flex-grow w-2/5">
                {datarecieved ? (
                  <ChartWrapper
                    classname={""}
                    title={"College data"}
                    chartdata={classCourseData}
                  />
                ) : (
                  <div className="rounded-lg overflow-hidden bg-blue-100  gap-5 justify-center items-center text-3xl font-bold  flex flex-col shadow-lg text-gray-500 h-3/6">
                    Loading...
                  </div>
                )}
              </div>
              <div className="flex-grow w-4/4">
                {datarecieved ? (
                  <BarWrapper datasets={All} title={"ALL"} />
                ) : (
                  <div className="rounded-lg overflow-hidden bg-blue-100  gap-5 justify-center items-center text-3xl font-bold  flex flex-col shadow-lg text-gray-500 h-3/6">
                    Loading...
                  </div>
                )}
              </div>
            </div>
            <div className="w-2/5 flex-grow">
              {" "}
              <FacultyCard
                user={{
                  name: session.user.name,
                  role: session.user.role,
                  id: session.user.id,
                }}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Working on it</div>;
  }
};

export default DashBoard;
