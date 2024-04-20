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
    days: reqBody.days,
  });
  await plan.save();
  return NextResponse.json({ message: "Plan saved successfully", success: true });
}

export async function GET(request: NextRequest) {
  const userId = await getDataFromToken(request);
  let user = await User.findById(userId);
  let plans = await Plan.find({ user: user });
  return NextResponse.json({ plans: plans, success: true });
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    let user = await User.findById(userId);
    const planId = (request as any).query.planId as string; // Ensure planId is properly extracted

    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required", success: false }, { status: 400 });
    }

    const plan = await Plan.findById(planId);

    if (!plan) {
      return NextResponse.json({ message: "Plan not found", success: false }, { status: 404 });
    }

    if (plan.user.toString() !== user._id.toString()) {
      return NextResponse.json({ message: "You are not authorized to delete this plan", success: false }, { status: 403 });
    }

    await plan.deleteOne();
    const plans = await Plan.find({ user: user });

    return NextResponse.json({ message: "Plan deleted successfully", plans: plans, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
  }
}
