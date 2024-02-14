import databaseConnection from "../../utils/database.js";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    await databaseConnection();
    const usuario = await User.findOne({ email: req.body.email });

    if (!usuario) {
      return res.status(401).json({
        statusCode: 401,
        message: "Usuário não cadastrado!",
        data: { email: req.body.email },
      });
    }

    const validatePassword = bcrypt.compareSync(req.body.password, usuario.password);

    if (!validatePassword) {
      return res.status(401).json({
        statusCode: 401,
        message: "Senha incorreta!",
      });
    }

    const token = jwt.sign({ name: usuario.name }, SECRET);

    res.status(200).json({
      statusCode: 200,
      message: `Login realizado com sucesso`,
      token,
      usuario: usuario.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export const tokenVerification = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Não autorizado",
    });
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: "Token inválido" });
  }
};
