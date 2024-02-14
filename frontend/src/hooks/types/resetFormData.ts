import { z } from "zod";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";

type resetFormData = z.infer<typeof resetPasswordSchema>;
export { resetPasswordSchema };
export type { resetFormData };
