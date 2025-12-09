import model from "./model.js";

export async function createUser(user) {
  try {
    const newUser = await model.create(user);
    return {
      ...newUser.toObject(),
      _id: newUser._id.toString()
    };
  } catch (error) {
    console.error("DAO Error - createUser:", error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

export async function findAllUsers() {
  try {
    const users = await model.find().lean();
    return users.map(user => ({
      ...user,
      _id: user._id.toString()
    }));
  } catch (error) {
    console.error("DAO Error - findAllUsers:", error);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function findUserById(userId) {
  try {
    const user = await model.findById(userId).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString()
    };
  } catch (error) {
    console.error("DAO Error - findUserById:", error);
    throw new Error(`Failed to find user: ${error.message}`);
  }
}

export async function findUserByUsername(username) {
  try {
    const user = await model.findOne({ username: username }).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString()
    };
  } catch (error) {
    console.error("DAO Error - findUserByUsername:", error);
    throw new Error(`Failed to find user by username: ${error.message}`);
  }
}

export async function findUserByCredentials(username, password) {
  try {
    const user = await model.findOne({ username, password }).lean();
    if (!user) return null;
    return {
      ...user,
      _id: user._id.toString()
    };
  } catch (error) {
    console.error("DAO Error - findUserByCredentials:", error);
    throw new Error(`Failed to verify credentials: ${error.message}`);
  }
}

export async function updateUser(userId, user) {
  try {
    return await model.updateOne({ _id: userId }, { $set: user });
  } catch (error) {
    console.error("DAO Error - updateUser:", error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function deleteUser(userId) {
  try {
    return await model.findByIdAndDelete(userId);
  } catch (error) {
    console.error("DAO Error - deleteUser:", error);
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

export async function findUsersByRole(role) {
  try {
    const users = await model.find({ role: role }).lean();
    return users.map(user => ({
      ...user,
      _id: user._id.toString()
    }));
  } catch (error) {
    console.error("DAO Error - findUsersByRole:", error);
    throw new Error(`Failed to find users by role: ${error.message}`);
  }
}

export async function findUsersByPartialName(partialName) {
  try {
    const regex = new RegExp(partialName, "i");
    const users = await model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    }).lean();
    return users.map(user => ({
      ...user,
      _id: user._id.toString()
    }));
  } catch (error) {
    console.error("DAO Error - findUsersByPartialName:", error);
    throw new Error(`Failed to find users by name: ${error.message}`);
  }
}