import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    // HERO IMAGE (Top Banner)
    coverImage: {
      type: String, // Cloudinary URL
      required: true,
    },

    // PROJECT DETAILS
    details: {
      category: String,
      date: Date,
      client: String,
      software: [String], // ["Webflow", "Figma"]
      website: String,
    },

    // MAIN CONTENT (Paragraphs)
    description: [
      {
        type: String,
      },
    ],

    // CHALLENGES SECTION
    challengesTitle: {
      type: String,
      default: "Project Challenges",
    },

    challengesDescription: String,

    // FEATURES / BULLETS
    features: [
      {
        type: String,
      },
    ],

    // GALLERY IMAGES
    gallery: [
      {
        type: String, // image URLs
      },
    ],

    // OPTIONAL TAGS
    tags: [String],

    // STATUS
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio ||
  mongoose.model("Portfolio", portfolioSchema);