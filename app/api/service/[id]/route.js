import { NextResponse } from "next/server";
import Service from "@/models/Service";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";

// ✅ CLOUDINARY UPLOAD
const uploadToCloudinary = async (file, folder = "services") => {
  try {
    if (!file || !file.name) return null;

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
    return null;
  }
};

// ✅ GET SINGLE SERVICE
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({
        success: false,
        message: "Service not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: service,
    });

  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch service",
    });
  }
}

// ✅ UPDATE SERVICE
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX

    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({
        success: false,
        message: "Service not found",
      });
    }

    const formData = await req.formData();

    // 🔥 BASIC
    const title = formData.get("title")?.trim();
    const slugInput = formData.get("slug");

    const slug = slugInput
      ? slugInput
      : title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

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

    // 🔥 STEPS
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

    // 🔥 FILE UPDATES
    const newIcon = await uploadToCloudinary(formData.get("icon"), "services/icons");
    const newCover = await uploadToCloudinary(formData.get("coverImage"), "services/covers");
    const newVideoThumb = await uploadToCloudinary(formData.get("videoThumbnail"), "services/videos");

    const updatedData = {
      title,
      slug,
      shortDescription,
      description,
      benefitsTitle,
      benefitsDescription,
      features,
      videoUrl,
      steps,
      delay,
      order,
      isFeatured,
    };

    if (newIcon) updatedData.icon = newIcon;
    if (newCover) updatedData.coverImage = newCover;
    if (newVideoThumb) updatedData.videoThumbnail = newVideoThumb;

    const updated = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("PUT ERROR:", error);

    return NextResponse.json({
      success: false,
      message: error.message || "Update failed",
    });
  }
}

// ✅ DELETE SERVICE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({
        success: false,
        message: "Service not found",
      });
    }

    await Service.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Delete failed",
    });
  }
}