import { z } from "zod";

export const createOccupationSchema =
  z.object({
    name: z.string().min(2).max(100),
  });

export const createOccupationsSchema = z.array(createOccupationSchema);

export const updateOccupationSchema =
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

export type CreateOccupationInput = z.infer<typeof createOccupationSchema>;


export type UpdateOccupationInput = z.infer<typeof updateOccupationSchema>;