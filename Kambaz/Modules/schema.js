import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // ADD THIS LINE - explicitly set _id as String
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
    _id: false // ADD THIS - tells Mongoose not to auto-generate ObjectId
  }
);

export default moduleSchema;