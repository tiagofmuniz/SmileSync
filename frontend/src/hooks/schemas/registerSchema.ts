import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Digite um nome"),
    email: z.string().email("Digite um email válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não são iguais.",
  });
