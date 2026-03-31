import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// ✅ DELETE LEAD
export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await connectDB();

    await Contact.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Lead deleted 🗑️",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json({
      success: false,
      message: "Delete failed ❌",
    });
  }
}

// ✅ UPDATE STATUS
export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    await connectDB();

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    return Response.json({
      success: true,
      message: "Status updated ✅",
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return Response.json({
      success: false,
      message: "Update failed ❌",
    });
  }
}