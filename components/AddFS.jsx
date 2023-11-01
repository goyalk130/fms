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

const App = ({ user, close, getFaculty }) => {
  const router = useRouter();
  const onSubmit = async (data) => {
    data.preventDefault();
    try {
      if (user == "class") {
        await axios.post(`/api/${user}`, {
          name: Name,
        });
      } else {
        await axios.post(`/api/${user}`, {
          id: Id,
          password: password,
          name: Name,
          classname: Class,
          course: Course,
        });
      }
    } catch (err) {}

    close();
    getFaculty();
  };

  const [Class, setClass] = useState("");
  const [Course, setCourse] = useState("");
  const [Name, setName] = useState("");
  const [Id, setId] = useState("");
  const [password, setpassword] = useState("");
  const [User, setUser] = useState([]);
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
      />
      {user != "class" && (
        <>
          <TextField
            type="password"
            label="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <TextField
            label="User ID"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Class}
              label="Class"
              onChange={(e) => {
                setClass(e.target.value);
              }}
            >
              {classes.map((eachClass) => (
                <MenuItem value={eachClass?.name}>{eachClass.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {user == "faculty" && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Course}
                label="Course"
                onChange={(e) => {
                  setCourse(e.target.value);
                }}
              >
                {courses.map((eachClass) => (
                  <MenuItem value={eachClass?.code}>{eachClass.code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default App;
