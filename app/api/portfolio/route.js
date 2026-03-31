import { NextResponse } from "next/server";
import Portfolio from "@/models/Portfolio";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb"; // ✅ USE THIS

// ✅ CLOUDINARY UPLOAD FUNCTION
const uploadToCloudinary = async (file, folder = "portfolio") => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        )
        .end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

// ✅ GET ALL PORTFOLIOS
export async function GET() {
  try {
    await connectDB(); // ✅ FIXED

    const data = await Portfolio.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch portfolios",
    });
  }
}

// ✅ CREATE PORTFOLIO
export async function POST(req) {
  try {
    await connectDB(); // ✅ FIXED

    const formData = await req.formData();

    const title = formData.get("title")?.trim();
    const category = formData.get("category");
    const date = formData.get("date");
    const client = formData.get("client");
    const website = formData.get("website");

    if (!title) {
      return NextResponse.json({
        success: false,
        message: "Title is required",
      });
    }

    // ✅ SLUG
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // ✅ SOFTWARE ARRAY
    const software = formData
      .get("software")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

    // ✅ ARRAYS
    const description = formData.getAll("description[]").filter(Boolean);
    const features = formData.getAll("features[]").filter(Boolean);

    const challengesDescription = formData.get("challengesDescription");

    // ✅ COVER IMAGE
    let coverImage = "";
    const coverFile = formData.get("coverImage");

    if (coverFile && coverFile.name) {
      coverImage = await uploadToCloudinary(coverFile);
    }

    // ✅ GALLERY
    const galleryFiles = formData.getAll("gallery");
    const gallery = [];

    for (const file of galleryFiles) {
      if (file && file.name) {
        const url = await uploadToCloudinary(file);
        gallery.push(url);
      }
    }

    // ✅ SAVE
    const portfolio = await Portfolio.create({
      title,
      slug,
      coverImage,

      details: {
        category,
        date,
        client,
        software,
        website,
      },

      description,
      challengesDescription,
      features,
      gallery,
    });

    return NextResponse.json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to create portfolio",
      error: error.message,
    });
  }
}