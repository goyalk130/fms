"use client";
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import Plus from "components/Plus";
import FacultyName from "components/FacultyName";
import FacultyCard from "components/FacultyCard";
import SimpleDialog from "components/SimpleDialog";
import AddFS from "components/AddFS";
import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";

async function getdata() {
  try {
    const data = await axios.get("/api/class");
    return data;
  } catch (err) {
    return {};
  }
}

const Class = () => {
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [classes, setclasses] = useState({});

  async function deleteById(id) {
    try {
      const data = await axios.delete(`/api/class/${id}`);
      getAllClasses();
    } catch (err) {}
  }

  const [open, setopen] = useState(false);

  const session = useSession();

  function getAllClasses() {
    getdata().then(({ data }) => {
      setid(data?.data[0].id);
      setdata(data.data);
      getClassData(data?.data[0].id);
    });
  }
  useEffect(() => {
    getAllClasses();
  }, []);

  useEffect(() => {
    getClassData(id);
  }, [id]);

  async function getClassData(id) {
    const data = await axios.get(`/api/class/${id}`);
    setclasses(data.data.data[0]);
  }

  function handleDialogopen() {
    setopen(!open);
  }
  return (
    <div className="flex gap-5 w-10/12 p-2">
      <div className="w-4/6 p-5 flex flex-col items-center gap-3 bg-blue-50 rounded-lg">
        {data.length != 0 ? (
          <>
            {data.map((item) => {
              return (
                <FacultyName
                  user={item}
                  getdata={setid}
                  deletedata={deleteById}
                />
              );
            })}
          </>
        ) : (
          <>
            {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}

            <Skeleton variant="rectangular" width={"91%"} height={45} />
            <Skeleton variant="rounded" width={"91%"} height={45} />
            <Skeleton variant="rounded" width={"91%"} height={45} />
            <Skeleton variant="rounded" width={"91%"} height={45} />
            <Skeleton variant="rounded" width={"91%"} height={45} />
          </>
        )}

        <Plus className="w-11/12 mt-2" onAddClick={handleDialogopen} />
      </div>
      <div className="w-2/6">
        <FacultyCard user={classes} />
      </div>
      <SimpleDialog title={"Add Class"} open={open} onClose={handleDialogopen}>
        <AddFS
          user="class"
          close={handleDialogopen}
          getFaculty={getAllClasses}
        />
      </SimpleDialog>
    </div>
  );
};

export default memo(Class);
