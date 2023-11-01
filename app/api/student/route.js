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

    const classid = await client.classes.findUnique({
      where: { name: classname },
    });

    user = await client.student.create({
      data: {
        userId: id,
        password: hashpass,
        name,
        classes: { connect: { id: classid.id } },
      },
    });

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
    const data = await client.student.findMany();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};

export const studentclient = client
