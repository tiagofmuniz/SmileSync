import databaseConnection from "../../utils/database.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt";

export const listUsers = async () => {
  await databaseConnection();
  return await User.find();
};

export const createUser = async (user) => {
  console.log(user);
  if (!user) throw new Error("Usuário não encontrado");

  await databaseConnection();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const userWithHashedPassword = { ...user, password: hashedPassword };
  const createdUser = await User.create(userWithHashedPassword);
  return createdUser;
};

export const deleteUser = async (id) => {
  await databaseConnection();
  await User.findByIdAndDelete(id);
};

export const updateUser = async (id, newBody) => {
  await databaseConnection();
  await User.findByIdAndUpdate(id, newBody);
};
