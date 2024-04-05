import { NextResponse, NextRequest } from "next/server";
import Plan from "@/models/plan";
import {connect} from "@/dbConfig/dbConfig";

// const planSchema = new Schema({
//     days:[
//         {
//             date: {type:Date},
//             hotel: {type:String},
//             places: [{type:String}],
//             activities: [{type:String}]
//         }
//     ]
// });

// export default models.Plan || model('Plan',planSchema);

connect()

export async function POST(request: NextRequest){
    //using fetch api to get the request body
    const reqBody = await request.json();
    console.log(reqBody);

    //creating a new plan
    const plan = new Plan({
        days: reqBody.days
    });

    //saving the plan
    await plan.save();

    //returning the response
    return NextResponse.json({message: "Plan saved successfully", success: true});
}
