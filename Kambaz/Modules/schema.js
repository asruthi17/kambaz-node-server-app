import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, 
    name: String,
    description: String,
    course: String, 
    lessons: [
      {
        _id: String,
        name: String,
        description: String,
        module: String,
      },
    ],
  },
  { 
    collection: "modules",
    _id: false 
  }
);

export default moduleSchema;