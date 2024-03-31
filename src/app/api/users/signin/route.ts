import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server"; 
import { sendEmail } from "@/helpers/mailer";   
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exists"},{status:400})
        }
        console.log("User exists");
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"},{status:400})
        }
        console.log("Password is valid");
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        console.log("Token generated");
       const response = NextResponse.json({
        message: "User logged in successfully",
        success: true,
       })

       response.cookies.set("token", token,{
        httpOnly: true,
       })

        return response;



    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
        
    }

}