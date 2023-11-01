"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo, useEffect, useState } from "react";
import Classdata from "components/Classdata";

const page = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});
  useEffect(() => {
    axios.get(`/api/class/${id}`).then((data) => {
      setData(data.data.data);
    });
  }, []);
  return (
    <div className="h-screen w-full overflow-hidden overflow-y-scroll">
      <Classdata classdata={Data} />
      <Link href={`/dashboard/class/${id}/timetable`}>TimeTable</Link>
    </div>
  );
};

export default memo(page);
