import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ FIX: await params
    const { slug } = await context.params;

    console.log("API SLUG:", slug);

    if (!slug) {
      return Response.json({
        success: false,
        message: "Slug missing ❌",
      });
    }

    const blog = await Blog.findOne({
      slug: slug.trim().toLowerCase(),
    }).lean();

    if (!blog) {
      return Response.json({
        success: false,
        message: "Blog not found ❌",
      });
    }

    return Response.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("SLUG FETCH ERROR:", error);

    return Response.json({
      success: false,
      message: "Failed to fetch blog ❌",
    });
  }
}