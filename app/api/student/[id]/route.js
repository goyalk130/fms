import client from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await client.student.findFirst({
      where: { id: id },
      select: { id: true, classes: true, Attdenace: true, name: true,userId:true,role:true },
    });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, {params})=>{
  const { id } = params;

  try{
    await client.student.delete({where:{id:id}})
  }catch(err){
  }
  
  return NextResponse.json({ success: true });
}

export const PUT = async (req, { params }) => {
  try {
    const body = await req.json();
    const { name,password,classid, attendanceid="" } = body;
    const { id } = params;
    if (name != "") {
      const updatedStudent = await client.student.update({
        where: { id: id },
        data: {
          name: name,
        },
      });
    }
    if (password != "") {
      const updatedStudent = await client.student.update({
        where: { id: id },
        data: {
          password: password,
        },
      });
    }
    if (classid) {
      const data = await client.student.findUnique({ where: { id: id } });
      if (data.classesId != classid) {
        // const updatedStudent = await client.student.update({
        //   where: { id: id },
        //   data: {
        //     classes: {
        //       disconnect: {
        //         id:data.classesId
        //       },
        //     },
        //   },
        // });
        const updatedStudentdata = await client.student.update({
          where: { id: id },
          data: { classes: { connect: { id: classid } } },
        });
      } 
    } else if (attendanceid!="") {
      const attdenace = await client.attdenace.findUnique({where:{id:attendanceid}})
      const data = await client.attdenace.update({where:{id:attendanceid},data:{status:!(attdenace.status)}});
    }
    return NextResponse.json({ success: true, data: "updatedStudentdata" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
};
