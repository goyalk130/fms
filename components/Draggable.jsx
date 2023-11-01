"use client"
import React from "react";

const Draggable = ({title,index}) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("drag", JSON.stringify({...title}));
      }}
      onDragEnd={(e)=>{
        e.dataTransfer.clearData()

      }}
      className="w-28 cursor-pointer h-20 bg-blue-400 m-0 p-0 flex justify-center items-center font-bold text-lg text-white"
    >
      {title && title?.name.split(" ")[0]}
    </div>
  );
};

export default Draggable;
