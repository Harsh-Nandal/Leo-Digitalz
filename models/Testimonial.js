import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: String,
    review: String,
    thumb: String,
    clientImg: String,
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);