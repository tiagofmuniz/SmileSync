import { Router } from "express";
import { createDentist, listDentist, deleteDentist, updateDentist } from "../../services/dentists/dentistsOperations.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const dentistList = await listDentist();
    res.status(200).json(dentistList);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/create-dentist", async (req, res) => {
  console.log(req.body);
  try {
    const dentist = await createDentist(req.body);
    res.status(201).json({ dentist, message: "Dentista criado com sucesso.\n" });
  } catch (error) {
    res.status(400).json({
      error: { message: error },
    });
  }
});

router.delete("/:dentistId", async (req, res) => {
  try {
    await deleteDentist(req.params.dentistId);
    res.send("Usuário excluído com sucesso");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:dentistId", async (req, res) => {
  try {
    await updateDentist(req.params.dentistId, req.body);
    const dentistList = await listDentist();
    res.send(dentistList);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});


export default router;
