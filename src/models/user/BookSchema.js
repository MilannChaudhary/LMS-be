import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "defaultimg",
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
