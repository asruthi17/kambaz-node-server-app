import model from "./model.js";

export function createUser(user) {
  delete user._id;  // Let MongoDB create it
  return model.create(user);
}

export async function findAllUsers() {
  const users = await model.find().lean();
  return users.map(user => ({
    ...user,
    _id: user._id.toString()  // Convert to string for consistency
  }));
}

export async function findUserById(userId) {
  const user = await model.findById(userId).lean();
  if (!user) return null;
  return {
    ...user,
    _id: user._id.toString()
  };
}

export async function findUserByUsername(username) {
  const user = await model.findOne({ username: username }).lean();
  if (!user) return null;
  return {
    ...user,
    _id: user._id.toString()
  };
}

export async function findUserByCredentials(username, password) {
  const user = await model.findOne({ username, password }).lean();
  if (!user) return null;
  return {
    ...user,
    _id: user._id.toString()
  };
}

export function updateUser(userId, user) {
  return model.updateOne({ _id: userId }, { $set: user });
}

export function deleteUser(userId) {
  return model.findByIdAndDelete(userId);
}

export async function findUsersByRole(role) {
  const users = await model.find({ role: role }).lean();
  return users.map(user => ({
    ...user,
    _id: user._id.toString()
  }));
}

export async function findUsersByPartialName(partialName) {
  const regex = new RegExp(partialName, "i");
  const users = await model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  }).lean();
  return users.map(user => ({
    ...user,
    _id: user._id.toString()
  }));
}