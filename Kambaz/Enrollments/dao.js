import model from "./model.js";
import userModel from "../Users/model.js";

export async function enrollUserInCourse(userId, courseId) {
  const existingEnrollment = await model.findOne({ user: userId, course: courseId });
  if (!existingEnrollment) {
    return model.create({ user: userId, course: courseId });
  }
}

export function unenrollUserFromCourse(userId, courseId) {
  return model.deleteOne({ user: userId, course: courseId });
}

export function findEnrollmentsForUser(userId) {
  return model.find({ user: userId });
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId });
  const enrolledUserIds = enrollments.map((enrollment) => enrollment.user);
  const users = await userModel.find({ _id: { $in: enrolledUserIds } });
  return users;
}