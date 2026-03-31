import { NextResponse } from "next/server";
import Portfolio from "@/models/Portfolio";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose"; // ✅ REQUIRED

// ✅ CLOUDINARY UPLOAD
const uploadToCloudinary = async (file, folder = "portfolio") => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
};

// ✅ GET SINGLE PORTFOLIO
export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX (IMPORTANT)

    // ✅ VALIDATE ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid ID",
      });
    }

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return NextResponse.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: portfolio,
    });

  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch portfolio",
    });
  }
}

// ✅ DELETE
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    const deleted = await Portfolio.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Delete failed",
    });
  }
}

// ✅ UPDATE
export async function PUT(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    const formData = await req.formData();
    const updateData = {};

    const title = formData.get("title");

    if (title) {
      updateData.title = title.trim();
      updateData.slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    updateData.details = {
      category: formData.get("category"),
      date: formData.get("date"),
      client: formData.get("client"),
      software: formData
        .get("software")
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [],
      website: formData.get("website"),
    };

    updateData.description = formData.getAll("description[]").filter(Boolean);
    updateData.features = formData.getAll("features[]").filter(Boolean);
    updateData.challengesDescription = formData.get("challengesDescription");

    // COVER
    const coverFile = formData.get("coverImage");
    if (coverFile && coverFile.name) {
      updateData.coverImage = await uploadToCloudinary(coverFile);
    }

    // GALLERY
    const galleryFiles = formData.getAll("gallery");
    if (galleryFiles.length > 0) {
      const gallery = [];

      for (const file of galleryFiles) {
        if (file && file.name) {
          const url = await uploadToCloudinary(file);
          gallery.push(url);
        }
      }

      updateData.gallery = gallery;
    }

    const updated = await Portfolio.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Update failed",
    });
  }
}