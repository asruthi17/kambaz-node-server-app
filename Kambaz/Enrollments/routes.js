import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  const findUsersForCourse = (req, res) => {
    const { courseId } = req.params;
    const users = dao.findUsersForCourse(courseId);
    res.json(users);
  };

  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
}