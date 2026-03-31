import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

// ✅ GET COMMENTS
export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params?.id;

    console.log("GET COMMENTS ID:", id);

    // ✅ VALIDATE ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({
        success: false,
        message: "Invalid blog ID ❌",
      });
    }

    const blog = await Blog.findById(id).select("comments");

    if (!blog) {
      return Response.json({
        success: false,
        message: "Blog not found ❌",
      });
    }

    return Response.json({
      success: true,
      comments: blog.comments || [],
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return Response.json({
      success: false,
      message: "Failed to fetch comments ❌",
    });
  }
}

// ✅ ADD COMMENT
export async function POST(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params?.id;

    console.log("POST COMMENT ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({
        success: false,
        message: "Invalid blog ID ❌",
      });
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({
        success: false,
        message: "All fields required ❌",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            _id: new mongoose.Types.ObjectId(), // ✅ required
            name,
            email,
            message,
            createdAt: new Date(), // ✅ ensure timestamp
          },
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return Response.json({
        success: false,
        message: "Blog not found ❌",
      });
    }

    return Response.json({
      success: true,
      message: "Comment added ✅",
      comments: updatedBlog.comments,
    });
  } catch (error) {
    console.error("POST ERROR:", error);
    return Response.json({
      success: false,
      message: "Failed to add comment ❌",
    });
  }
}

// ✅ DELETE COMMENT
export async function DELETE(req, context) {
  try {
    await connectDB();

    const params = await context.params;
    const id = params?.id;

    console.log("DELETE COMMENT BLOG ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({
        success: false,
        message: "Invalid blog ID ❌",
      });
    }

    const { commentId } = await req.json();

    if (!commentId) {
      return Response.json({
        success: false,
        message: "Comment ID required ❌",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return Response.json({
        success: false,
        message: "Blog not found ❌",
      });
    }

    return Response.json({
      success: true,
      message: "Comment deleted ✅",
      comments: updatedBlog.comments,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return Response.json({
      success: false,
      message: "Delete failed ❌",
    });
  }
}