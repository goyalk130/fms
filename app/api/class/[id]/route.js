import client from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await client.classes.findMany({
      where: { id: id },
      select: { id:true,name:true,faculty:true,student:true,daySlot: { select: { timeSlots: true } } },
    });

    return NextResponse.json({ success: true, data },{status:200});
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await client.classes.delete({ where: { id: id } });
  } catch (err) {
  }

  return NextResponse.json({ success: true });
};
