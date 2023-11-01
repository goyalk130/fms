import client from "../../../../../libs/prismadb";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    const data = await req.json()
    const {type,id} = params
    
    if(data.classname!=""){
        await client.faculty.update({where:{id:id},data:{classes:null}})
    }


    // switch(type){
    //     case "admin":
            
    // }

    return NextResponse.json({message:"ok"})
};

