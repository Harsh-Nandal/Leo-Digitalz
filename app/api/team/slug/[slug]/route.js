import { NextResponse } from "next/server";
import Team from "@/models/Team";
import { connectDB } from "@/lib/mongodb";

// ✅ GET BY SLUG
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params; // ✅ fix

    const team = await Team.findOne({ slug });

    if (!team) {
      return NextResponse.json({
        success: false,
        message: "Team member not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: team,
    });

  } catch (error) {
    console.error("TEAM SLUG ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Error fetching team member",
    });
  }
}