import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: String,
  dob: Date,
  role: {
    type: String,
    enum: ["STUDENT", "FACULTY", "ADMIN", "TA"],
    default: "STUDENT"
  },
  loginId: String,
  section: String,
  lastActivity: Date,
  totalActivity: String
}, { 
  collection: "users"
});

export default userSchema;