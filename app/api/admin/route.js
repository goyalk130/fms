import { NextResponse } from "next/server";
import client from "../../libs/prismadb";

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

    user = await client.admin.create({
      data: { userId: id, password: hashpass, name },
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
  const data = req.json();
  try {
    const userdata = await client.admin.findMany();
    return NextResponse.json({ success: true, data: userdata });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
};

export const adminclient = client