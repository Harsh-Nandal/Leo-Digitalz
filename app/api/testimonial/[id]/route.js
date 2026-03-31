import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";

// 🔥 helper: extract public_id from URL
const getPublicId = (url) => {
  try {
    const parts = url.split("/");
    const fileName = parts.pop(); // abc123.jpg
    const folder = parts.slice(parts.indexOf("upload") + 1).join("/"); 

    const publicId = `${folder}/${fileName.split(".")[0]}`;
    return publicId;
  } catch {
    return null;
  }
};

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const testimonial = await Testimonial.findById(params.id);

    if (!testimonial) {
      return Response.json({
        success: false,
        message: "Testimonial not found ❌",
      });
    }

    // 🔥 DELETE IMAGES FROM CLOUDINARY
    if (testimonial.thumb) {
      const publicId = getPublicId(testimonial.thumb);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    if (testimonial.clientImg) {
      const publicId = getPublicId(testimonial.clientImg);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // 🔥 DELETE FROM DB
    await Testimonial.findByIdAndDelete(params.id);

    return Response.json({
      success: true,
      message: "Deleted successfully 🗑️ (Cloudinary + DB)",
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Delete failed ❌",
      error: error.message,
    });
  }
}