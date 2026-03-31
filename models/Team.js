import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    // 🔥 BASIC INFO
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    designation: {
      type: String,
      required: true,
    },

    // 🔥 IMAGES
    image: {
      type: String, // profile image
    },

    coverImage: {
      type: String, // optional banner
    },

    // 🔥 ABOUT
    shortBio: {
      type: String,
    },

    description: [
      {
        type: String,
      },
    ],

    // 🔥 SOCIAL LINKS
    socialLinks: {
      linkedin: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      github: { type: String },
      website: { type: String },
    },

    // 🔥 CONTACT (OPTIONAL)
    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    // 🔥 SKILLS
    skills: [
      {
        type: String,
      },
    ],

    // 🔥 EXPERIENCE / STATS
    experience: {
      type: Number, // years
    },

    projects: {
      type: Number,
    },

    clients: {
      type: Number,
    },

    // 🔥 ADMIN CONTROL
    order: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Team ||
  mongoose.model("Team", teamSchema);