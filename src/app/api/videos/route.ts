import { authOptions } from "@/lib/auth";
import { dbConnection } from "@/lib/db.config";
import Video, { IVideo } from "@/models/Video.models";
import { NextRequest,NextResponse } from "next/server";
import getServerSession from "next-auth";

export async function GET(){
    try {
        await dbConnection();
        const videos = await Video.findById({}).sort({createdAt:-1}).lean();

        if(!videos?.length) {
            return NextResponse.json({message:"No video is their",data:[]},{status:200});
        }

        return NextResponse.json({message:"Videos fetched successfully",data:videos},{status:200});
    } catch (error : any) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}

export async function POST(req:NextRequest){
    try {
        const sessions = getServerSession(authOptions);
        if(!sessions){
            return NextResponse.json({error:"Unauthenticated"},{status:401});
        }

        await dbConnection();
        const body:IVideo = await req.json();
        if(!body.title ||!body.description ||!body.videoUrl ||!body.thumbnailUrl){
            return NextResponse.json({error:"All fields are required"},{status:400});
        }

        const newVideo = await Video.create({
            ...body, 
            controls:body.controls ?? true,
            transformation:{
                height: body.transformation?.height?? 1920,
                width: body.transformation?.width?? 1080,
                quality: body.transformation?.quality?? 100
            }
        });

        return NextResponse.json({message:"Video created successfully",data:newVideo},{status:201});
    } catch (error : any) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}