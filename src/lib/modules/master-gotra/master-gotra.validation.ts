import { z } from "zod";

export const createGotraSchema =
  z.object({
    name: z.string().min(2).max(100),
  });

export const createGotrasSchema = z.array(createGotraSchema);

export const updateGotraSchema =
  z.object({
    id: z.number(),

    code: z
      .string()
      .min(1)
      .max(20)
      .optional(),

    name: z
      .string()
      .min(2)
      .max(100)
      .optional(),
  });

export type CreateGotraInput = z.infer<typeof createGotraSchema>;


export type UpdateGotraInput = z.infer<typeof updateGotraSchema>;