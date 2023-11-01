import client from "../../../../libs/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { facultyid, courseid } = await req.json();
    const { id } = params;
    const timeslot = await client.timeSlot.update({
      where: { id: id },
      data: {
        faculty: { connect: { id: facultyid } },
        course: { connect: { id: courseid } },
      },
    });
    return NextResponse.json({ success: true, data: timeslot });
  } catch (Err) {
    return NextResponse.json({ success: false, error: Err });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    const { facultyid, courseid } = await req.json();
    const { id } = params;
    const timeslot = await client.timeSlot.update({
      where: { id: id },
      data: {
        faculty: { disconnect: { id: facultyid } },
        course: { disconnect: { id: courseid } },
      },
    });
     return NextResponse.json({ success: true, data: timeslot });
  } catch (Err) {
    return NextResponse.json({ success: false, error: Err });
  }
};
