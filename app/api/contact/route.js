import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ GET ALL LEADS
export async function GET() {
  try {
    await connectDB();

    const data = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch leads ❌",
    });
  }
}

// ✅ CREATE LEAD (FORM SUBMIT)
export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, department, message } = body;

    // 🔥 Basic validation
    if (!name || !email || !phone) {
      return Response.json({
        success: false,
        message: "Required fields missing ❌",
      });
    }

    await connectDB();

    // ✅ Save to DB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      department,
      message,
    });

    // ✅ Send Email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Lead",
      html: `
        <h2>New Lead Received 🚀</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Department:</b> ${department}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Lead saved successfully ✅",
      data: newContact,
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return Response.json({
      success: false,
      message: "Something went wrong ❌",
      error: error.message,
    });
  }
}