import { Router } from "express";
import { login, tokenVerification } from "../../services/users/authOperations.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error(error);
    console.error('aqui');
    res.status(500).json({ statusCode: 500, message: "Erro interno do servidor" });
  }
});

export const rotaAutenticada = async (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Rota Autenticada",
    redirectTo: "/authenticated",
  });
};

// Rota autenticada
router.post("/rotaAutenticada", tokenVerification, rotaAutenticada);

export default router;
