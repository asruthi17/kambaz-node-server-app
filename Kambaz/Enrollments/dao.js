import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const existingEnrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (!existingEnrollment) {
      enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function findUsersForCourse(courseId) {
    const { enrollments, users } = db;
    const enrolledUserIds = enrollments
      .filter((enrollment) => enrollment.course === courseId)
      .map((enrollment) => enrollment.user);
    return users.filter((user) => enrolledUserIds.includes(user._id));
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findUsersForCourse,
  };
}