"use client";
import React, { createContext, useEffect, useState } from "react";
import TimeTable from "components/TimeTable";
import Draggable from "components/Draggable";
import { useParams } from "next/navigation";
import { FacultyContext } from "utils/facultycontext";
import axios from "axios";

const page = () => {
  const { id } = useParams();

  const [DraggableComs, setDraggableComs] = useState([]);
  const [TimeTableSlots, setTimeTableSlots] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [reload, setreload] = useState(0);
  useEffect(() => {
    setreload((r) => r + 1);
  }, [DraggableComs]);

  useEffect(() => {
    axios.get(`/api/class/${id}/faculty`).then((data) => {
      setDraggableComs(() => {
        let arr = [];
        data.data.data.faculty.forEach((element) => {
          element?.course.forEach((item) => {
            arr.push({ name: element.name, id: element.id, course: item });
          });
        });
        return arr;
      });
    });
    axios.get(`/api/class/${id}/daySlot`).then((data) => {
      setTimeTableSlots(data.data.data.daySlot);
    });
  }, []);

  useEffect(() => {
    if (TimeTableSlots != [] && DraggableComs != []) {
      setLoading(false);
    }
  }, [DraggableComs, TimeTableSlots]);
  return (
    <div className=" relative flex justify-center flex-col items-center w-full p-5 bg-blue-50 ">
      {Loading ? (
        <h1 className="text-5xl font-extrabold text-blue-500 bg-blue-50 h-full flex justify-center items-center w-full">
          Loading...
        </h1>
      ) : (
        <FacultyContext.Provider value={{ setDraggableComs }}>
          {DraggableComs && (
            <>
              <div className="h-full m-5 w-full flex flex-col justify-center  items-center ">
                <div
                  onClick={() => {
                    setDraggableComs((data) => data.splice(0, 1));
                  }}
                ></div>
                <div className="flex w-full gap-2 top-0 absolute">
                  {DraggableComs?.map((eachFaculty, key) => {
                    return <Draggable title={eachFaculty} index={key} />;
                  })}
                </div>
                <TimeTable data={TimeTableSlots} />
              </div>
            </>
          )}
        </FacultyContext.Provider>
      )}
    </div>
  );
};

export default page;
