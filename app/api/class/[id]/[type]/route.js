import client from "../../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id, type } = params;

    switch (type) {
      case "faculty":
        let faculty = await client.classes.findFirst({
          where: { id: id },
          select: {
            faculty: {
              select: {
                id: true,
                name: true,
                userId: true,
                course: true,
                classes: true,
                role: true,
              },
            },
          },
        });
        return NextResponse.json(
          { success: true, data: faculty },
          { status: 200 }
        );
      case "student":
        let student = await client.classes.findFirst({
          where: { id: id },
          select: { student: true },
        });
        return NextResponse.json(
          { success: true, data: student },
          { status: 200 }
        );
      case "daySlot":
        let daySlot = await client.classes.findFirst({
          where: { id: id },
          select: {
            daySlot: {select:{id:true,name:true, timeSlots: {
              select: {
                id: true,
                startTime: true,
                endTime: true,
                status: true,
                facultyId: true,
                faculty: true,
                courseId: true,
                course: true,
                daySlotId: true,
                daySlots: true,
                Attdenace:true,
              },
            },}},
           
          },
        });
        return NextResponse.json(
          { success: true, data: daySlot },
          { status: 200 }
        );
    }
    const data = await client.classes.findMany({
      where: { id: id },
      select: { daySlot: { select: { timeSlots: true } } },
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
};
