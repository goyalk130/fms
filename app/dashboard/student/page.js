"use client";
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import Plus from "components/Plus";
import FacultyName from "components/FacultyName";
import FacultyCard from "components/FacultyCard";
import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import SimpleDialog from "components/SimpleDialog";
import AddFS from "components/AddFS";

async function getdata() {
  const data = await axios.get("/api/student");
  return data;
}
const Student = () => {
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [faculty, setfaculty] = useState({});

  async function deleteById(id) {
    try {
      const data = await axios.delete(`/api/student/${id}`);
      getAllStudent();
    } catch (err) {}
  }

  const [open, setopen] = useState(false);

  const session = useSession();

  function getAllStudent() {
    getdata().then(({ data }) => {
      setid(data?.data[0].id);
      setdata(data.data);
      getfacultydata(data?.data[0].id);
      setfaculty(data?.data[0]);
    });
  }

  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    getfacultydata(id);
  }, [id]);

  async function getfacultydata(id) {
    const data = await axios.get(`/api/student/${id}`);
    setfaculty(data.data.data);
  }

  function handleDialogopen() {
    setopen(!open);
  }

  async function getfacultydata(id) {
    const data = await axios.get(`/api/student/${id}`);
    setfaculty(data.data.data);
  }
  return (
    <div className="flex h-screen gap-4 w-10/12 p-2">
      <div className="w-4/6 p-5 flex flex-col items-center gap-3 h-full overflow-hidden overflow-y-scroll bg-blue-50 rounded-lg">
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

        <Plus
          className="w-11/12 mt-2 sticky bottom-0"
          onAddClick={handleDialogopen}
        />
      </div>
      <div className="w-2/6">
        <FacultyCard user={faculty} />
      </div>
      <SimpleDialog
        title={"Add Student"}
        open={open}
        onClose={handleDialogopen}
      >
        <AddFS
          user="student"
          close={handleDialogopen}
          getFaculty={getAllStudent}
        />
      </SimpleDialog>
    </div>
  );
};

export default memo(Student);
