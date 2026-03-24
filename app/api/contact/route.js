import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, department, message } = body;

    // ✅ Connect DB
    await connectDB();

    // ✅ Save to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      department,
      message,
    });

    // ✅ Send Email via Resend
    await resend.emails.send({
      from: "onboarding@resend.dev", // default test sender
      to: process.env.EMAIL_USER, // your email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Department:</b> ${department}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Form submitted successfully 🚀",
      data: newContact,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json({
      success: false,
      message: "Something went wrong ❌",
      error: error.message,
    });
  }
}