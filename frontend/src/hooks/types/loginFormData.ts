import { z } from "zod";
import { loginSchema } from "../schemas/loginSchema";

export type loginFormData = z.infer<typeof loginSchema>;
