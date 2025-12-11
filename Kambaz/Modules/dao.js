import { v4 as uuidv4 } from "uuid";
import model from "./model.js"; 
export async function findModulesForCourse(courseId) {
  const modules = await model.find({ course: courseId });
  return modules;
}

export async function createModule(courseId, module) {
  const newModule = {
    ...module,
    _id: uuidv4(),
    course: courseId
  };
  const createdModule = await model.create(newModule);
  return createdModule;
}

export async function deleteModule(courseId, moduleId) {
  const status = await model.deleteOne({ 
    _id: moduleId, 
    course: courseId 
  });
  return status;
}

export async function updateModule(courseId, moduleId, moduleUpdates) {
  const module = await model.findOneAndUpdate(
    { _id: moduleId, course: courseId },
    { $set: moduleUpdates },
    { new: true }
  );
  return module;
}