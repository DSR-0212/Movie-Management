import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    MovieName: 
    {
      type: String,
      required: true,
    },
    TheaterName: 
    {
      type: String,
      required: true,
    },
    MovieTime: 
    {
      type: String,
      required: true,
    },
    SeatAvailable: 
    {
      type: String,
      required: true,
    },
    ShowStatus: 
    {
      type: String,
      enum: ["Active", "Inactive", "Upcoming"],
      default: "Active",
    },
    Screen: 
    {
      type: String,
      required: true,
    },
    MoviePrice: 
    {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const movie = mongoose.model("Movie", movieSchema);

export default movie;