import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getIdFromToken";
import Plan from "@/models/plan";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const userId = await getDataFromToken(request);
  let user = await User.findById(userId);

  const plan = new Plan({
    user: user,
    destination: reqBody.destination,
    startDate: reqBody.startDate,
    endDate: reqBody.endDate,
    budget: reqBody.budget,
    travelType: reqBody.travelType,
    numAdults: reqBody.numAdults,
    numChildren: reqBody.numChildren,
    // imageUrl: reqBody.imageUrl,
    days: reqBody.days,
  });
  await plan.save();
  return NextResponse.json({
    message: "Plan saved successfully",
    success: true,
  });
}

export async function GET(request: NextRequest) {
  const userId = await getDataFromToken(request);
  let user = await User.findById(userId);
  let plans = await Plan.find({ user: user });
  return NextResponse.json({ plans: plans, success: true });
}

export async function DELETE(request: NextRequest) {
  try {
    const urlParts = request.url.split("?");
    const queryString = urlParts.length > 1 ? urlParts[1] : "";
    const queryParams = new URLSearchParams(queryString);
    const planId = queryParams.get("planId");
    console.log("plan is in backend is", planId);
    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required", success: false },
        { status: 400 }
      );
    }

    // Find the plan and delete it
    const plan = await Plan.findById(planId);

    if (!plan) {
      return NextResponse.json(
        { message: "Plan not found", success: false },
        { status: 404 }
      );
    }

    console.log("Deleting plan:", plan);
    await plan.deleteOne();

    // Optionally, you can return some response if needed
    return NextResponse.json(
      { message: "Plan deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
