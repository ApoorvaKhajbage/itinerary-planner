import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server"; 
import { sendEmail } from "@/helpers/mailer";   

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}})
        
        if(!user){
            return NextResponse.json({error: "Invalid or Expired Token"},{status:400})
        } 
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        await user.save();

        return NextResponse.json({
            message: "Email Verified Successfully! You can now login.",
            success: true},
            {status:200})
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}
