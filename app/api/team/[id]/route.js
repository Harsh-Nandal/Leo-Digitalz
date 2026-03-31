import { NextResponse } from "next/server";
import Team from "@/models/Team";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";

// ✅ UPLOAD
const upload = async (file) => {
  if (!file || !file.name) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "team" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

// ✅ GET SINGLE
export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  const team = await Team.findById(id);

  return NextResponse.json({ success: true, data: team });
}

// ✅ UPDATE
export async function PUT(req, { params }) {
  await connectDB();

  const { id } = await params;
  const formData = await req.formData();

  const team = await Team.findById(id);
  if (!team) return NextResponse.json({ success: false });

  const image = await upload(formData.get("image"));

  const updated = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    designation: formData.get("designation"),
    shortBio: formData.get("shortBio"),
    experience: formData.get("experience"),
    projects: formData.get("projects"),
    clients: formData.get("clients"),
    order: formData.get("order"),
    isFeatured: formData.get("isFeatured") === "true",

    description: formData.getAll("description[]"),
    skills: formData.getAll("skills[]"),
  };

  if (image) updated.image = image;

  const data = await Team.findByIdAndUpdate(id, updated, { new: true });

  return NextResponse.json({ success: true, data });
}

// ✅ DELETE
export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params;

  await Team.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}