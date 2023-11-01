import client from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await client.faculty.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        userId: true,
        course: true,
        classes: true,
        role: true,
        Timeslot: true,
      },
    });

    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await client.faculty.delete({ where: { id: id } });
  } catch (err) {
  }

  return NextResponse.json({ success: true });
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await client.faculty.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        userId: true,
        course: true,
        classes: true,
        role: true,
        Timeslot: true,
      },
    });
    const body = await req.json();
    const { classid, courseid, name, password } = body;
    if (name != "") {
      const updatedStudent = await client.faculty.update({
        where: { id: id },
        data: {
          name: name,
        },
      });
    }
    if (password != "") {
      const updatedStudent = await client.faculty.update({
        where: { id: id },
        data: {
          password: password,
        },
      });
    }
    if (classid != "") {
      // const data = await client.faculty.findFirst({
      //   where: { id: id, classes: { some: { id: classid } } },
      // });

      if (data.classes[0]?.id != classid) {
        const updatedStudent = await client.faculty.update({
          where: { id: id },
          data: {
            classes: {
              disconnect: {
                id: data.classes[0].id,
              },
            },
          },
        });
        data.Timeslot?.forEach(async (element) => {
          // const slot = await client.timeSlot.findFirst({where:{id:element.id}})
          await client.timeSlot.update({
            where: { id: element.id },
            data: {
              faculty: { disconnect: true },
              course: { disconnect: true },
            },
          });
        });
        const updatedStudentdata = await client.faculty.update({
          where: { id: id },
          data: { classes: { connect: { id: classid } } },
        });
      }
    }

    if (courseid != "") {
      if (data.course[0]?.id != courseid) {
        const updatedStudent = await client.faculty.update({
          where: { id: id },
          data: {
            course: {
              disconnect: {
                id:data.course[0]?.id
              },
            },
          },
        });
        const updatedStudentdata = await client.faculty.update({
          where: { id: id },
          data: { course: { connect: { id: courseid } } },
        });
      }
    }
    return NextResponse.json({ success: true, data: "Updated faculty" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
};
