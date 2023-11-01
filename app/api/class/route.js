import client from "../../libs/prismadb";
import { NextResponse } from "next/server";
import createClass from "utils/createClass";
import bcrypt from "bcrypt";

export const POST = async (req, { params }) => {
  let user = {};
  try {
    const data = await req.json();
    const { id, password, name, course, classname } = data;
    let hashpass = "";
    if (password) {
      hashpass = await bcrypt.hash(password, 10);
    }
    const times = [
      { startTime: "9 am", endTime: "10 am" },
      { startTime: "10 am", endTime: "11 am" },
      { startTime: "11 am", endTime: "12 pm" },
      { startTime: "12 pm", endTime: "1 pm" },
      { startTime: "1 pm", endTime: "2 pm" },
      { startTime: "2 pm", endTime: "3 pm" },
      { startTime: "3 pm", endTime: "4 pm" },
    ];
    let obj = await client.classes.create({
      data: {
        name,
        daySlot: {
          create: [
            {
              name: "monday",
              timeSlots: {
                create: [
                  { startTime: "9 am", endTime: "10 am" },
                  { startTime: "10 am", endTime: "11 am" },
                  { startTime: "11 am", endTime: "12 pm" },
                  { startTime: "12 pm", endTime: "1 pm" },
                  { startTime: "1 pm", endTime: "2 pm" },
                  { startTime: "2 pm", endTime: "3 pm" },
                  { startTime: "3 pm", endTime: "4 pm" },
                ],
              },
            },
            {
              name: "Tuesday",
              timeSlots: {
                create: [
                  { startTime: "9 am", endTime: "10 am" },
                  { startTime: "10 am", endTime: "11 am" },
                  { startTime: "11 am", endTime: "12 pm" },
                  { startTime: "12 pm", endTime: "1 pm" },
                  { startTime: "1 pm", endTime: "2 pm" },
                  { startTime: "2 pm", endTime: "3 pm" },
                  { startTime: "3 pm", endTime: "4 pm" },
                ],
              },
            },
            {
              name: "Wednesday",
              timeSlots: {
                create: [
                  { startTime: "9 am", endTime: "10 am" },
                  { startTime: "10 am", endTime: "11 am" },
                  { startTime: "11 am", endTime: "12 pm" },
                  { startTime: "12 pm", endTime: "1 pm" },
                  { startTime: "1 pm", endTime: "2 pm" },
                  { startTime: "2 pm", endTime: "3 pm" },
                  { startTime: "3 pm", endTime: "4 pm" },
                ],
              },
            },
            {
              name: "Thrusday",
              timeSlots: {
                create: [
                  { startTime: "9 am", endTime: "10 am" },
                  { startTime: "10 am", endTime: "11 am" },
                  { startTime: "11 am", endTime: "12 pm" },
                  { startTime: "12 pm", endTime: "1 pm" },
                  { startTime: "1 pm", endTime: "2 pm" },
                  { startTime: "2 pm", endTime: "3 pm" },
                  { startTime: "3 pm", endTime: "4 pm" },
                ],
              },
            },
            {
              name: "Friday",
              timeSlots: {
                create: [
                  { startTime: "9 am", endTime: "10 am" },
                  { startTime: "10 am", endTime: "11 am" },
                  { startTime: "11 am", endTime: "12 pm" },
                  { startTime: "12 pm", endTime: "1 pm" },
                  { startTime: "1 pm", endTime: "2 pm" },
                  { startTime: "2 pm", endTime: "3 pm" },
                  { startTime: "3 pm", endTime: "4 pm" },
                ],
              },
            },
          ],
        },
      },
    });
    
    return NextResponse.json({ message: "ok", obj }, { status: 200 });

    // const faculty = await prisma.faculty.create({
    //   data: { userId: data.id, name: data.name, password: data.password },
    // });
  } catch (err) {
    return NextResponse.json(
      { message: "error occured", error: err },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "ok", user }, { status: 200 });
};

export const GET = async (req) => {
  try {
    const data = await client.classes.findMany({
      select: {
        id: true,
        name: true,
        faculty: true,
        student: true,
        daySlot: { select: { timeSlots: true } },
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};


export const classclient = client