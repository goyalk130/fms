"use client";
import React from "react";
import TimeSlot from "./TimeSlot";

const TimeTableRow = ({ data }) => {
  return (
    <tr>
      <td className="w-28 h-24 border-solid text-center font-bold relative m-0 p-0 border-black border-2 bg-blue-950 text-white">
        {data.name}
      </td>
      {data.timeSlots.map((item) => {
        return <TimeSlot data={item} />;
      })}
    </tr>
  );
};

export default TimeTableRow;
