import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email obrigatório").email("Email obrigatório").toLowerCase(),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
