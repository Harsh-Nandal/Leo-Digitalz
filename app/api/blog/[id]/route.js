import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

// 🔥 CLOUDINARY UPLOAD
const uploadToCloudinary = async (file) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const uploaded = await cloudinary.uploader.upload(base64, {
    folder: "blogs",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return uploaded.secure_url;
};

// 🔥 EXTRACT PUBLIC ID
const getPublicId = (url) => {
  try {
    if (!url || !url.includes("upload")) return null;

    const parts = url.split("/");
    const fileName = parts.pop();
    const folder = parts.slice(parts.indexOf("upload") + 1).join("/");

    return `${folder}/${fileName.split(".")[0]}`;
  } catch {
    return null;
  }
};

// =============================
// ✅ GET SINGLE BLOG
// =============================
export async function GET(req, context) {
  const { id } = await context.params;
  try {
    await connectDB();

    const blog = await Blog.findById(id).lean();

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
    console.error("GET BLOG ERROR:", error);

    return Response.json({
      success: false,
      message: "Failed to fetch blog ❌",
    });
  }
}

// =============================
// ✅ UPDATE BLOG (FULL FIX)
// =============================
export async function PUT(req, context) {
  try {
    await connectDB();

    // ✅ FIX HERE
    const { id } = await context.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return Response.json({
        success: false,
        message: "Blog not found ❌",
      });
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const date = formData.get("date");
    const category = formData.get("category");

    const coverImageFile = formData.get("coverImage");

    const quoteText = formData.get("quoteText");
    const quoteAuthor = formData.get("quoteAuthor");

    // CONTENT
    const content = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("content[")) {
        content.push(value);
      }
    }

    // COVER IMAGE
    let coverImageUrl = blog.coverImage;

    if (coverImageFile && coverImageFile.size > 0) {
      if (blog.coverImage) {
        const publicId = getPublicId(blog.coverImage);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      coverImageUrl = await uploadToCloudinary(coverImageFile);
    }

    // IMAGES
    let imageUrls = blog.images || [];
    const newImages = formData.getAll("images");

    if (newImages.length > 0 && newImages[0].size > 0) {
      for (let img of imageUrls) {
        const publicId = getPublicId(img);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      imageUrls = [];

      for (let file of newImages) {
        if (file && file.size > 0) {
          const url = await uploadToCloudinary(file);
          imageUrls.push(url);
        }
      }
    }

    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        title: title?.trim(),
        date,
        category,
        coverImage: coverImageUrl,
        content,
        quote: {
          text: quoteText || "",
          author: quoteAuthor || "",
        },
        images: imageUrls,
      },
      { new: true },
    );

    return Response.json({
      success: true,
      message: "Blog updated successfully ✅",
      data: updated,
    });
  } catch (error) {
    console.error("BLOG UPDATE ERROR:", error);

    return Response.json({
      success: false,
      message: "Update failed ❌",
    });
  }
}

// =============================
// ✅ DELETE BLOG
// =============================
export async function DELETE(req, context) {
  try {
    await connectDB();

    // ✅ FIX HERE
    const { id } = await context.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return Response.json({
        success: false,
        message: "Blog not found ❌",
      });
    }

    if (blog.coverImage) {
      const publicId = getPublicId(blog.coverImage);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    if (blog.images?.length) {
      for (let img of blog.images) {
        const publicId = getPublicId(img);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
    }

    await Blog.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Blog deleted successfully 🗑️",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json({
      success: false,
      message: "Delete failed ❌",
    });
  }
}
