import { z } from "zod";

export const recoverSchema = z.object({
  email: z.string().email("Digite um email válido"),
});
