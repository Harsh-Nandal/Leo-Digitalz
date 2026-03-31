import { NextResponse } from "next/server";
import Service from "@/models/Service";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";

// ✅ CLOUDINARY UPLOAD
const uploadToCloudinary = async (file, folder = "services") => {
  try {
    if (!file || !file.name) return "";

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
  } catch (err) {
    console.error("Cloudinary Error:", err);
    return "";
  }
};

// ✅ GET ALL SERVICES
export async function GET() {
  try {
    await connectDB();

    const services = await Service.find().sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch services",
    });
  }
}

// ✅ CREATE SERVICE (FULLY FIXED)
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    // 🔥 BASIC
    const title = formData.get("title")?.trim();
    if (!title) {
      return NextResponse.json({
        success: false,
        message: "Title required",
      });
    }

    // 🔥 SLUG (manual OR auto)
    let slug = formData.get("slug");
    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // 🔥 SIMPLE FIELDS
    const shortDescription = formData.get("shortDescription") || "";
    const benefitsTitle = formData.get("benefitsTitle") || "";
    const benefitsDescription = formData.get("benefitsDescription") || "";
    const videoUrl = formData.get("videoUrl") || "";

    const delay = Number(formData.get("delay")) || 200;
    const order = Number(formData.get("order")) || 0;
    const isFeatured = formData.get("isFeatured") === "true";

    // 🔥 ARRAYS
    const description = formData
      .getAll("description[]")
      .map((d) => d.trim())
      .filter(Boolean);

    const features = formData
      .getAll("features[]")
      .map((f) => f.trim())
      .filter(Boolean);

    // 🔥 STEPS (FULL FIX)
    const steps = [];
    let i = 0;

    while (true) {
      const stepTitle = formData.get(`steps[${i}][title]`);
      if (!stepTitle) break;

      steps.push({
        icon: formData.get(`steps[${i}][icon]`) || "",
        title: stepTitle,
        description: formData.get(`steps[${i}][description]`) || "",
        number: formData.get(`steps[${i}][number]`) || `0${i + 1}`,
        delay: Number(formData.get(`steps[${i}][delay]`)) || 200,
      });

      i++;
    }

    // 🔥 FILE UPLOADS
    const icon = await uploadToCloudinary(formData.get("icon"), "services/icons");
    const coverImage = await uploadToCloudinary(formData.get("coverImage"), "services/covers");
    const videoThumbnail = await uploadToCloudinary(formData.get("videoThumbnail"), "services/videos");

    // ✅ SAVE
    const service = await Service.create({
      title,
      slug,
      shortDescription,
      icon,
      coverImage,
      videoThumbnail,
      description,
      benefitsTitle,
      benefitsDescription,
      features,
      videoUrl,
      steps,
      delay,
      order,
      isFeatured,
    });

    return NextResponse.json({
      success: true,
      message: "Service created successfully",
      data: service,
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}