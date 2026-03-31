import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    coverImage: {
      type: String, // Cloudinary URL
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },

    content: [
      {
        type: String, // paragraphs
      },
    ],

    quote: {
      text: String,
      author: String,
    },

    images: [
      {
        type: String, // additional images (2 images section)
      },
    ],

    comments: [
      {
        name: String,
        email: String,
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
