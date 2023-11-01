import { NextResponse } from "next/server"
import client from "../../../libs/prismadb"
import { facultyclient } from "../../faculty/route"
import { studentclient } from "../../student/route"
import { classclient } from "../../class/route"
import { courseclient } from "../../course/route"
import { adminclient } from "../../admin/route"
export const GET =async (req)=>{
    const Admin =await adminclient.admin.aggregate({_count:true})
    const Faculty =await facultyclient.faculty.aggregate({_count:true})
    const Student =await studentclient.student.aggregate({_count:true})
    const Class =await classclient.classes.aggregate({_count:true})
    const Course =await courseclient.courses.aggregate({_count:true})
    return NextResponse.json({success:true,data:{Admin,Faculty,Student,Class,Course}})
}