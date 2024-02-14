import { z } from "zod";
import { registerSchema } from "../schemas/registerSchema";
export type registerFormData = z.infer<typeof registerSchema>;
export { registerSchema };
