"use client";
import React from "react";
import TimeTable from "components/TimeTable";
import Draggable from "components/Draggable";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  return (
    <div>
      <TimeTable />
      <Draggable title={"Com"} />
    </div>
  );
};

export default page;
