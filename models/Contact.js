import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    department: String,
    message: String,
    status: {
      type: String,
      default: "new", // new | pending | contacted
    },
  },
  { timestamps: true },
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
