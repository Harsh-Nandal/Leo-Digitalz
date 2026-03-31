import { NextResponse } from "next/server";
import Team from "@/models/Team";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";

// ✅ UPLOAD
const upload = async (file) => {
  if (!file || !file.name) return "";

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

// ✅ GET ALL TEAM
export async function GET() {
  try {
    await connectDB();

    const teams = await Team.find().sort({ order: 1 });

    return NextResponse.json({
      success: true,
      data: teams,
    });

  } catch (error) {
    console.error("GET TEAM ERROR:", error);

    return NextResponse.json({
      success: false,
      data: [],
    });
  }
}

// ✅ CREATE TEAM
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");

    if (!name) {
      return NextResponse.json({ success: false });
    }

    // slug auto
    let slug = formData.get("slug");
    if (!slug) {
      slug = name.toLowerCase().replace(/\s+/g, "-");
    }

    const image = await upload(formData.get("image"));

    const team = await Team.create({
      name,
      slug,
      designation: formData.get("designation"),
      shortBio: formData.get("shortBio"),
      experience: formData.get("experience"),
      projects: formData.get("projects"),
      clients: formData.get("clients"),
      order: formData.get("order"),
      isFeatured: formData.get("isFeatured") === "true",

      description: formData.getAll("description[]"),
      skills: formData.getAll("skills[]"),

      image,
    });

    return NextResponse.json({
      success: true,
      data: team,
    });

  } catch (error) {
    console.error("POST TEAM ERROR:", error);

    return NextResponse.json({
      success: false,
    });
  }
}