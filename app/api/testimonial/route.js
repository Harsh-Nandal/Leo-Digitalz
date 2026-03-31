import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";

// ✅ GET ALL
export async function GET() {
  try {
    await connectDB();

    const data = await Testimonial.find().sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
}

// 🔥 HELPER: upload → cloudinary
const uploadToCloudinary = async (file) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const uploaded = await cloudinary.uploader.upload(base64, {
    folder: "testimonials",
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return uploaded.secure_url;
};

// 🔥 HELPER: extract public_id
const getPublicId = (url) => {
  try {
    const parts = url.split("/");
    const fileName = parts.pop();
    const folder = parts.slice(parts.indexOf("upload") + 1).join("/");
    return `${folder}/${fileName.split(".")[0]}`;
  } catch {
    return null;
  }
};

// ✅ ADD
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const role = formData.get("role");
    const review = formData.get("review");

    const thumbFile = formData.get("thumb");
    const clientImgFile = formData.get("clientImg");

    let thumbUrl = "";
    let clientImgUrl = "";

    if (thumbFile && thumbFile.size > 0) {
      thumbUrl = await uploadToCloudinary(thumbFile);
    }

    if (clientImgFile && clientImgFile.size > 0) {
      clientImgUrl = await uploadToCloudinary(clientImgFile);
    }

    const newItem = await Testimonial.create({
      name,
      role,
      review,
      thumb: thumbUrl,
      clientImg: clientImgUrl,
    });

    return Response.json({
      success: true,
      message: "Testimonial added ✅",
      data: newItem,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Failed to add testimonial ❌",
      error: error.message,
    });
  }
}

// ✅ UPDATE (PUT 🔥)
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id"); // IMPORTANT
    const name = formData.get("name");
    const role = formData.get("role");
    const review = formData.get("review");

    const thumbFile = formData.get("thumb");
    const clientImgFile = formData.get("clientImg");

    const existing = await Testimonial.findById(id);

    if (!existing) {
      return Response.json({
        success: false,
        message: "Testimonial not found ❌",
      });
    }

    let thumbUrl = existing.thumb;
    let clientImgUrl = existing.clientImg;

    // 🔥 Replace thumb
    if (thumbFile && thumbFile.size > 0) {
      if (existing.thumb) {
        const publicId = getPublicId(existing.thumb);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      thumbUrl = await uploadToCloudinary(thumbFile);
    }

    // 🔥 Replace client image
    if (clientImgFile && clientImgFile.size > 0) {
      if (existing.clientImg) {
        const publicId = getPublicId(existing.clientImg);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }

      clientImgUrl = await uploadToCloudinary(clientImgFile);
    }

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      {
        name,
        role,
        review,
        thumb: thumbUrl,
        clientImg: clientImgUrl,
      },
      { new: true }
    );

    return Response.json({
      success: true,
      message: "Testimonial updated ✅",
      data: updated,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Update failed ❌",
      error: error.message,
    });
  }
}