import * as dao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  
  const enrollUserInCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    await dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    await dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  const findUsersForCourse = async (req, res) => {
    const { courseId } = req.params;
    const users = await dao.findUsersForCourse(courseId);
    res.json(users);
  };

  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
}