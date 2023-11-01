import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
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
    switch (params.userType) {
      case "student":
        const classid = await prisma.classes.findUnique({
          where: { name: classname },
        });

        user = await prisma.student.create({
          data: {
            userId: id,
            password: hashpass,
            name,
            classes: { connect: { id: classid.id } },
          },
        });
        break;


      case "admin":
        user = await prisma.admin.create({
          data: { userId: id, password: hashpass, name },
        });
        break;
      case "faculty":
        if (course != null && classname != null) {
          user = "";

          const classid = await prisma.classes.findUnique({
            where: { name: classname },
          });
          const courseid = await prisma.courses.findUnique({
            where: { code: course },
          });

          user = await prisma.faculty.create({
            data: {
              userId: id,
              password: hashpass,
              name,
              classes: { connect: { id: classid.id } },
              course: { connect: { id: courseid.id } },
            },
          });
        } else {
          user = await prisma.faculty.create({
            data: { userId: id, password: hashpass, name },
          });
        }
        break;


      case "course":
        user = await prisma.courses.create({
          data: { code: id, name },
        });
        break;


      case "class":
        let obj = await createClass(name);
        return NextResponse.json({ message: "ok", obj }, { status: 200 });

        break;
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
