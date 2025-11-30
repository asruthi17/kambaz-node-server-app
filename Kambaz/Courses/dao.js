import model from "./model.js";

export function findAllCourses() {
  return model.find();
}

export async function findCoursesForEnrolledUser(userId) {
  const enrollments = await enrollmentsModel.find({ user: userId });
  const courseIds = enrollments.map((enrollment) => enrollment.course);
  const courses = await model.find({ _id: { $in: courseIds } });
  return courses;
}

export function createCourse(course) {
  delete course._id;
  return model.create(course);
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

import enrollmentsModel from "../Enrollments/model.js";