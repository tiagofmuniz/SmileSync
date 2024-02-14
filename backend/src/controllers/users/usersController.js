import { Router } from "express";
import { listUsers, createUser, deleteUser, updateUser } from "../../services/users/usersOperations.js";

const router = Router();

// Listar usuários
router.get("/", async (req, res) => {
  const userList = await listUsers();
  res.send(userList);
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    const user = await createUser(req.body);
    res.status(201).json({ user, message: "Usuário criado com sucesso." });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error });
  }
});

// Excluir usuário
router.delete("/:userId", async (req, res) => {
  try {
    await deleteUser(req.params.userId);
    res.send("Usuário excluído com sucesso");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Atualizar usuário
router.put("/:userId", async (req, res) => {
  try {
    await updateUser(req.params.userId, req.body);
    const userList = await listUsers();
    res.send(userList);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
