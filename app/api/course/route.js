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

    user = await client.courses.create({
      data: { code: id, name },
    });
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
    const data = await client.courses.findMany();

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};


export const courseclient = client