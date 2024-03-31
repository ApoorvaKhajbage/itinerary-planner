import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server"; 
import { sendEmail } from "@/helpers/mailer";   
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest){

    try {
        
        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true,
        })
        
        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0)
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
        
    }

}