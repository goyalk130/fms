import client from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;
    const data = await client.courses.findFirst({ where: { id: id },select:{faculty:true} });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" + err },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const body = await req.json();
    const {facultyid} = body
    const { id } = params;
    const data = await client.courses.findUnique({ where: { id: id ,faculty:{some:{id:facultyid}}} });
    if (data) {
      const updatedStudent = await client.courses.update({
        where: { id: id },
        data: {
          faculty: {
            disconnect: {id:facultyid},
          },
        },
      });
      return NextResponse.json({ success: true, updatedStudent });
    } else {
      const updatedStudent = await client.courses.update({
        where: { id: id },
        data: { faculty: { connect: { id: facultyid } } },
      });
      return NextResponse.json({ success: true, data:updatedStudent });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
};

export const DELETE = async (req,{params})=>{
    try{    
        const {id} = params
        
        const res = await client.courses.delete({where:{id:id}})
        return NextResponse.json({success:true,data:res},{status:200});
    }catch(err){
        return NextResponse.json({success:false,error:"Internal Server Error "+err},{status:500});
    }
    
}
