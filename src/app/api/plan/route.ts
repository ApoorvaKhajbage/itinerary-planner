import { NextResponse, NextRequest } from "next/server";
import {getDataFromToken} from "@/helpers/getIdFromToken";
import Plan from "@/models/plan";
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest){
    const reqBody = await request.json();
    // console.log(reqBody);

    const userId = getDataFromToken(request);
    let user = await User.findById(userId);

    console.log(reqBody);
    const plan = new Plan({
        user: user,
        destination: reqBody.destination,
        startDate: reqBody.startDate,
        endDate: reqBody.endDate,
        budget: reqBody.budget,
        travelType: reqBody.travelType,
        numAdults: reqBody.numAdults,
        numChildren: reqBody.numChildren,
        days: reqBody.days,
    });
    await plan.save();
    console.log("Plan saved successfully:" + plan);

    //returning the response
    return NextResponse.json({message: "Plan saved successfully", success: true});
}



// export async function DELETE(request: NextRequest){
// }


//get plans for user
export async function GET(request: NextRequest){
    const userId = getDataFromToken(request);
    let user = await User.findById(userId)
    let plans = await Plan.find({user: user});
    // console.log("Plans:" + plans);
    return NextResponse.json({plans: plans, success: true});
}
