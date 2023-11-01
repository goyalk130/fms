import client from "../../../../libs/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await client.courses.findFirst({
      where: { id: id },
      select: { faculty: true },
    });

    data.faculty.map(async (eachfaculty) => {
      await client.faculty.update({
        where: { id: eachfaculty.id },
        data: { course: { disconnect: { id: id } } },
      });
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
};
