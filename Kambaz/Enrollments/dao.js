import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId });
  console.log("Enrollments found:", enrollments);
  
  const userIds = enrollments.map((e) => e.user);
  console.log("User IDs:", userIds);
  
  const userModel = (await import("../Users/model.js")).default;
  const users = await userModel.find({ _id: { $in: userIds } });
  console.log("Users found:", users);
  
  return users;
}

export function enrollUserInCourse(userId, courseId) {
  return model.create({
    user: userId,
    course: courseId,
    _id: `${userId}-${courseId}`,
  });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export function unenrollAllUsersFromCourse(courseId) {
  return model.deleteMany({ course: courseId });
}