import User from "../../models/user.js";
import crypto from "crypto";
import databaseConnection from "../../utils/database.js";
import bcrypt from 'bcrypt';

export const requestPasswordReset = async (email) => {
  await databaseConnection();
  
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  await user.save();

  return { resetToken };
};

export const resetPassword = async (token, newPassword) => {
  await databaseConnection();

  const user = await User.findOne({ resetPasswordToken: token });

  if (!user) {
    throw new Error("Token inválido");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  await user.save();

  return { message: "Senha redefinida com sucesso" };
};

