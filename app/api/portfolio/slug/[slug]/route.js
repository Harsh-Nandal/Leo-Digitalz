import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Portfolio from "@/models/Portfolio";

// DB CONNECT
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
};

// ✅ GET PORTFOLIO BY SLUG
export async function GET(req, { params }) {
  try {
    await connectDB();

    const portfolio = await Portfolio.findOne({
      slug: params.slug,
    });

    if (!portfolio) {
      return NextResponse.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: portfolio,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}