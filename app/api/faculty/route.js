import client from "../../libs/prismadb";
import { NextResponse } from "next/server";
import createClass from "utils/createClass";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  let user = {};
  try {
    const data = await req.json();
    const { id, password, name, course, classname } = data;
    let hashpass = "";
    if (password) {
      hashpass = await bcrypt.hash(password, 10);
    }

    if (course != null && classname != null) {
      user = "";

      const classid = await client.classes.findUnique({
        where: { name: classname },
      });
      const courseid = await client.courses.findUnique({
        where: { code: course },
      });

      user = await client.faculty.create({
        data: {
          userId: id,
          password: hashpass,
          name,
          classes: { connect: { id: classid.id } },
          course: { connect: { id: courseid.id } },
        },
      });
    } else {
      user = await client.faculty.create({
        data: { userId: id, password: hashpass, name },
      });
    }

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
    const data = await client.faculty.findMany();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};

export const facultyclient =  client