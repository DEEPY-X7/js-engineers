import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    founderName: {
      type: String,
      required: true,
      trim: true,
    },
    founderImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const About =
  mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;