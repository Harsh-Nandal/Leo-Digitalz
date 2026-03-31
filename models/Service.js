import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    // 🔥 BASIC
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    // 🔥 TOP SECTION
    coverImage: {
      type: String,
    },

    // 🔥 MULTIPLE PARAGRAPHS
    description: [
      {
        type: String,
      },
    ],

    // 🔥 BENEFITS
    benefitsTitle: {
      type: String,
      default: "Benefits of this service",
    },

    benefitsDescription: {
      type: String,
    },

    // 🔥 FEATURES LIST
    features: [
      {
        type: String,
      },
    ],

    // 🔥 VIDEO
    videoThumbnail: {
      type: String,
    },

    videoUrl: {
      type: String,
    },

    // 🔥 HOW WE WORK (FEATURE SECTION)
    steps: [
      {
        icon: {
          type: String, // image url
        },
        number: {
          type: String, // "01", "02"
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        delay: {
          type: Number,
          default: 200,
        },
      },
    ],

    // 🔥 OPTIONAL (LISTING PAGE SUPPORT)
    icon: {
      type: String,
    },

    shortDescription: {
      type: String,
    },

    delay: {
      type: Number,
      default: 200,
    },

    order: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);