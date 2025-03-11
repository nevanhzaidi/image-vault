import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.model("Image", imageSchema);
