import { Router } from "express";
import { requestPasswordReset, resetPassword } from "../../services/users/passwordOperations.js";
import nodemailer from "nodemailer";

const router = Router();

router.post("/request-reset", async (req, res) => {
  try {
    const result = await requestPasswordReset(req.body.email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/reset/:token", async (req, res) => {
  try {
    // console.log(req.body);
    const result = await resetPassword(req.params.token, req.body.confirmPassword);
    // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/sendEmail", async (req, res) => {
  // console.log(req.body);
  const { email, confirmationCode } = req.body;

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAILJSACCOUNT,
        pass: process.env.EMAILJS_KEY,
      },
    });

    transport.sendMail({
      from: "TiagoFMuniz <tiagofmuniz2020@gmail.com>",
      to: email,
      subject: "SmileSync - Recuperação de senha",
      html: `<h1>Código de recuperação: ${confirmationCode} </h1>`,
      text: `Código de recuperação: ${confirmationCode}`,
    });
    res.json("Digite o código de 6 dígitos recebido");
    res.end();
  } catch (error) {
    res.json(error);
    res.end();
  }
});

export default router;
