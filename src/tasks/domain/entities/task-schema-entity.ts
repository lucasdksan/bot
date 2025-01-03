import { z } from "zod";

export const schema = z.object({
    title: z.string(),
    description: z.string(),
    code: z.string(),
    estimated: z.date(),
    run: z.boolean(),
    step: z.enum(["Blocked"]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    createdBy: z.string().email().optional(),
    updatedBy: z.string().email().optional(),
});