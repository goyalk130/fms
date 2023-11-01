"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Button,
  FormGroup,
  FormLabel,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateFS = ({ id, type, user, close,reload }) => {
  const router = useRouter();
  const onSubmit = async (data) => {
    data.preventDefault();
    try {
      await axios.put(`/api/${type}/${id}`, {
        password: password || "",
        name: Name || "",
        classid: Class || "",
        courseid: Course || "",
      });
    } catch (err) {
    }

    close();
    reload()
  };

  const [Class, setClass] = useState("");
  const [Course, setCourse] = useState("");
  const [Name, setName] = useState("");
  const [Id, setId] = useState("");
  const [password, setpassword] = useState("");
  //   const [User, setUser] = useState([]);
  const [courses, setcourses] = useState([]);
  const [classes, setclasses] = useState([]);

  async function getUsers() {
    return await axios.get(`/api/${user}`);
  }
  async function getClasses() {
    return await axios.get(`/api/class`);
  }
  async function getCourses() {
    return await axios.get(`/api/course`);
  }

  useEffect(() => {
    // getUsers().then((data) => {
    // });
    getCourses().then((data) => {
      setcourses(data.data.data);
    });
    getClasses().then((data) => {
      setclasses(data.data.data);
    });
  }, []);

  

  return (
    <form onSubmit={onSubmit} className="flex flex-col p-5 px-12 gap-4">
      <TextField
        label="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        defaultValue={user?.name}
      />

      <>
        <TextField
          type="password"
          label="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Class"
            onChange={(e) => {
              const id = classes.find((item) => {
                return item.name == e.target.value;
              });
              setClass(id.id);
            }}
          >
            {classes.map((eachClass) => (
              <MenuItem value={eachClass?.name}>{eachClass.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {type == "faculty" && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Course"
              onChange={(e) => {
                const id = courses.find((item) => {
                  return item.code == e.target.value;
                });
                setCourse(id.id);
              }}
            >
              {courses.map((eachClass) => (
                <MenuItem value={eachClass?.code}>{eachClass.code}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UpdateFS;
