import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // ❌ Validate
    if (!email || !password) {
      return Response.json({
        success: false,
        message: "Email and password required",
      });
    }

    await connectDB();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return Response.json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return Response.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie (FIXED 🔥)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful ✅",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `adminToken=${token}; Path=/; HttpOnly; Max-Age=${
            60 * 60 * 24 * 7
          }; SameSite=Strict`,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return Response.json({
      success: false,
      message: "Server error ❌",
    });
  }
}