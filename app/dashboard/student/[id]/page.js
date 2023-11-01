"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import ViewUser from "components/ViewUser";
import { memo, useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});

  function getdata() {
    axios.get(`/api/student/${id}`).then((data) => {
      setData(data.data.data);
    });
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="w-10/12">
      <ViewUser user={Data} reload={getdata} />
    </div>
  );
};

export default memo(page);
