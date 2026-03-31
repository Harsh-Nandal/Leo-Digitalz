import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

// ✅ GET ALL BLOGS (FIXED)
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("GET BLOG ERROR:", error);

    return Response.json({
      success: false,
      message: "Failed to fetch blogs ❌",
      error: error.message,
    });
  }
}

// 🔥 CLOUDINARY UPLOAD HELPER
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

// ✅ CREATE BLOG (FINAL FIXED)
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const date = formData.get("date");
    const category = formData.get("category");

    const coverImageFile = formData.get("coverImage");

    const quoteText = formData.get("quoteText");
    const quoteAuthor = formData.get("quoteAuthor");

    // ✅ CONTENT ARRAY FIX
    const content = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("content[")) {
        content.push(value);
      }
    }

    // ✅ SLUG GENERATOR
    const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    let slug = slugify(title);

    // ✅ ENSURE UNIQUE SLUG
    let existing = await Blog.findOne({ slug });
    let counter = 1;

    while (existing) {
      slug = `${slugify(title)}-${counter}`;
      existing = await Blog.findOne({ slug });
      counter++;
    }

    // ✅ MULTIPLE IMAGES
    const imageFiles = formData.getAll("images");

    // 🔥 UPLOAD COVER IMAGE
    let coverImageUrl = "";
    if (coverImageFile && coverImageFile.size > 0) {
      coverImageUrl = await uploadToCloudinary(coverImageFile);
    }

    // 🔥 UPLOAD ADDITIONAL IMAGES
    const imageUrls = [];
    for (let file of imageFiles) {
      if (file && file.size > 0) {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      }
    }

    // ✅ CREATE BLOG (STRUCTURE FIXED)
    const blog = await Blog.create({
      title,
      slug,
      date,
      category,
      coverImage: coverImageUrl,
      content,
      quote: {
        text: quoteText || "",
        author: quoteAuthor || "",
      },
      images: imageUrls,
    });

    return Response.json({
      success: true,
      message: "Blog created successfully ✅",
      data: blog,
    });
  } catch (error) {
    console.error("BLOG CREATE ERROR:", error);

    return Response.json({
      success: false,
      message: "Failed to create blog ❌",
      error: error.message,
    });
  }
}