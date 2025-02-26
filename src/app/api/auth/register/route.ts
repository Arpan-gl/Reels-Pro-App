import { dbConnection } from "@/lib/db.config";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User.models";

export async function POST(req:NextRequest){
    try {
        const {email,password,username} = await req.json();

        if(!email || !password || !username){
            return NextResponse.json({error:"All fields are required"},{status:400});
        }

        await dbConnection();

        const isUserExist = await User.findOne({email:email,username:username});

        if(isUserExist){
            return NextResponse.json({error:"User already exists"},{status:409});
        }

        const user = new User({email, password, username});
        await user.save();

        return NextResponse.json({message:"User created successfully"},{status:201});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}