import { z } from "zod";
import { recoverSchema } from "@/hooks/schemas/recoverSchema";

type recoverFormData = z.infer<typeof recoverSchema>;
export { recoverSchema };
export type { recoverFormData };
