"use client";
import React, { useState, memo, useEffect } from "react";
import Draggable from "components/Draggable";
import { useContext } from "react";
import { FacultyContext } from "utils/facultycontext";
import axios from "axios";
import clsx from "clsx";

const TimeSlot = ({ data }) => {
  const { setDraggableComs } = useContext(FacultyContext);
  const [Selected, setSelected] = useState({});
  const [IsSelected, setIsSelected] = useState(false);

  // const [dummyDraggableComs, setdummyDraggableComs] = useState(DraggableComs)
  let arr = [];
  if (data?.faculty != null) {
    arr.push({
      name: data.faculty.name,
      id: data.faculty.id,
      course: data.course,
    });
  } // data?.faculty?.courseIds.forEach((element) => {
  // });

  const [Widget, setWidget] = useState([...arr]);
  const [round, setround] = useState(0);
  useEffect(() => {
    if (Widget.length != 0) {
    }
  }, [Widget]);
  return (
    <td
      onDrop={async (e) => {
        e.preventDefault();
        let ele = e.dataTransfer.getData("drag");
        e.dataTransfer.clearData();
        ele = JSON.parse(ele);

        setDraggableComs((data) => {
          let newdata = data.filter((item) => {
            if (item.id == ele.id && item.course.id == ele.course.id) {
              return false;
            }
            return true;
          });
          return newdata;
        });

        const res = await axios.put(`/api/update/timeslot/${data.id}`, {
          facultyid: ele.id,
          courseid: ele.course.id,
        });

        setWidget([ele]);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      className="w-28 h-24 border-solid relative m-0 p-0  border-black border-2"
    >
      <div
        className={`w-full h-full flex flex-col m-0 p-0 ${clsx({
          "opacity-70": IsSelected,
        })}`}
        onClick={() => {
          if (Widget.length != 0) {
            // setSelected({timeSlotId:data.id,facultyId:Widget.id,courseId:Widget[0].course.id})
            setIsSelected(!IsSelected);
          }
        }}
      >
        <h4 className="top-0 h-fit text-sm text-center   relative">
          {data.startTime + " - " + data.endTime}
        </h4>
        {Widget?.map((item) => {
          if (item) {
            return <Draggable title={item} />;
          }
        })}
      </div>
    </td>
  );
};

export default memo(TimeSlot);
