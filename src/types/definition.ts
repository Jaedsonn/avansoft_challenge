import * as z from "zod";
import { randomUUID } from "node:crypto";

export const StudentSchema = z.object({
  id: z.uuid().default(randomUUID()).optional().readonly(),
  name: z.string().min(1, "Name is required"),
  grade: z
    .number()
    .min(0, "Grade must be at least 0")
    .max(10, "Grade must be at most 10"),
});

export const DefaultMessageSchema = z.object({
  success: z.boolean(),
  message: z.string().min(1, "Message is required"),
});

export type Student = z.infer<typeof StudentSchema>;
export type DefaultMessage = z.infer<typeof DefaultMessageSchema>;
