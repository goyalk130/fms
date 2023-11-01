"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
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
import SimpleDialog from "./SimpleDialog";
import AddFS from "./AddFS";
import UpdateFS from "./UpdateFS";
import { useRouter } from "next/navigation";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewUser = ({ user,reload }) => {
  const router = useRouter();


  const [open, setopen] = useState(false);

  function handleDialogopen() {
    setopen(!open);
  }

  const [rendered, setrendered] = useState(false);
  const [chartdata, setchartdata] = useState({
    labels: ["Courses", "Classes"],
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
    if (user.classes) {
      setchartdata((value) => {
        value.datasets[0].data[0] = 1;
        value.datasets[0].data[1] = 1;
        return { ...value };
      });
      setrendered(true);
    }
  }, [user]);
  async function deleteById(id) {
    try {
      const data = await axios.delete(`/api/${user.role}/${id}`);
      router.back();
    } catch (err) {
    }
  }

  return (
    <div className="w-full p-4 flex flex-col justify-center gap-5">
      <div className="flex w-full bg-blue-50 p-5 gap-4  shadow-md">
        <div className="w-3/12 shadow-xl rounded-lg overflow-hidden">
          <img src="/faculty.jpg" />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex  text-8xl  font-bold ">
            <h2>{user?.name?.split(" ")[0]}</h2>
          </div>
          <div className="flex text-3xl opacity-50 capitalize font-semibold">
            <h2>{user.role}</h2>
          </div>
        </div>
        <div className="flex ">
          <button
            onClick={() => {
              handleDialogopen();
            }}
            className="bg-green-400 rounded-md w-16 text-sm h-8 mx-2 font-semibold tracking-wide"
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteById(user.id);
            }}
            className="bg-red-400 rounded-md w-16 text-sm h-8 mx-2 font-semibold tracking-wide"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="bg-blue-50 flex gap-4 w-full p-5 shadow-md">
        <div className="w-1/3">
          {rendered ? (
            <BarWrapper datasets={chartdata} title={"course classes"} />
          ) : (
            <div className="w-full bg-blue-100 rounded-lg overflow-hidden h-32"></div>
          )}
        </div>
        <div className="flex flex-col bg-gray-50 shadow-lg  flex-grow rounded-lg p-8 gap-7">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl text-blue-500 font-bold">Classes :</h1>
            {user.role== "faculty" ? user?.classes?.map((ele) => {
              return <h2 className="pl-5 text-xl">{ele.name}</h2>;
            }) : <h2 className="pl-5 text-xl">{user?.classes?.name}</h2>}
          </div>
          {user.role=="faculty" && <div className="flex items-baseline gap-2">
            <h1 className="text-3xl text-blue-500 font-bold">Courses :</h1>
            {user?.course?.map((ele) => {
              return <h2 className="pl-5 text-xl">{ele.code+":"+ele.name}</h2>;
            })}
          </div>}
        </div>
      </div>
      <SimpleDialog
        title={"Add Faculty"}
        open={open}
        onClose={handleDialogopen}
      >
        <UpdateFS
          id={user.id}
          type={user.role}
          user={user}
          close={handleDialogopen}
          reload={reload}
        />
      </SimpleDialog>
    </div>
  );
};

export default ViewUser;
