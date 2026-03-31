import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Testimonial from "@/models/Testimonial";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await connectDB();

    // 🔥 PARALLEL FETCH (FAST)
    const [blogs, testimonials, Contacts] = await Promise.all([
      Blog.countDocuments(),
      Testimonial.countDocuments(),
      Contact.countDocuments(),
    ]);

    // 🔥 BASIC ANALYTICS (you can replace with real data later)
    const visitors = blogs * 120 + testimonials * 80 + 500; // dummy logic
    const conversions = Contacts;
    const engagement = Math.min(100, Math.floor((testimonials / (blogs || 1)) * 100));

    return Response.json({
      success: true,
      data: {
        stats: {
          blogs,
          testimonials,
          Contacts,
        },
        analytics: {
          visitors,
          conversionRate: visitors
            ? Math.round((conversions / visitors) * 100)
            : 0,
          engagement,
        },
      },
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return Response.json({
      success: false,
      message: "Failed to fetch dashboard data ❌",
    });
  }
}