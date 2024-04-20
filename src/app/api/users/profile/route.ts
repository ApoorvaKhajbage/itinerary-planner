import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getIdFromToken";

connect();

export async function GET(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  // check if there is no user
  if (!user) {
    return NextResponse.json({
      message: "User not found",
      success: false,
    });
  }
  return NextResponse.json({
    message: "User profile found",
    data: user,
  });
}

export async function PUT(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId });
  // check if there is no user
  if (!user) {
    return NextResponse.json({
      message: "User not found",
      success: false,
    });
  }
  // extract data from request
  const reqBody = await request.json();
  // update user profile
  await user.updateOne(reqBody);
  // fetch the updated user data
  const updatedUser = await User.findOne({ _id: userId }).select("-password");
  return NextResponse.json({
    message: "User profile updated",
    success: true,
    data: updatedUser,
  });
}