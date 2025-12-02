import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import enrollmentsModel from "../Enrollments/model.js";

export function findAllCourses() {
  return model.find({}, { name: 1, description: 1, number: 1, _id: 1, image: 1 });   
}

export async function findCoursesForEnrolledUser(userId) {
  const enrollments = await enrollmentsModel.find({ user: userId });
  const courseIds = enrollments.map((enrollment) => enrollment.course);
  const courses = await model.find(
    { _id: { $in: courseIds } },
    { name: 1, description: 1, number: 1, _id: 1, image: 1 }  
  );
  return courses;
}

export function createCourse(course) {
  delete course._id;
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export function findCourseById(courseId) {
  return model.findById(courseId);
}