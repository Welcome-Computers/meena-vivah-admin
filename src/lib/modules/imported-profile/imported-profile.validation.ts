// imported-profile.validation.ts

import { z } from "zod";

export const createImportedProfileSchema =
  z.object({
    name: z.string().optional(),
    gender: z.string().optional(),
    mobile: z.string().optional(),
    dob: z.string().optional(),
    fathersname: z.string().optional(),
    self_gotra: z.string().optional(),
    m_gotra: z.string().optional(),
    gm_gotra: z.string().optional(),
    mat_gm_gotra: z.string().optional(),
    otherinfo: z.string().optional(),
    remarks: z.string().optional(),
    status: z.enum(["draft", "reviewed", "deleted", "moved", "rejected",]).optional(),
  });

export const updateImportedProfileSchema = createImportedProfileSchema
  .partial()
  .extend({
    id: z.coerce.number(),
  });

export type CreateImportedProfileInput = z.infer<typeof createImportedProfileSchema>;

export type UpdateImportedProfileInput = z.infer<typeof updateImportedProfileSchema>;



export const moveImportedProfileSchema =
  z.object({

    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(1, "Mobile is required"),
    gender: z.string().min(1, "Gender is required"),

    self_gotra: z.string().min(1, "Self gotra is required"),
    m_gotra: z.string().min(1, "M gotra is required"),
    gm_gotra: z.string().min(1, "GM gotra is required"),
    mat_gm_gotra: z.string().nullish(),

    dob: z.string().optional(),
    fathersname: z.string().optional(),
    otherinfo: z.string().optional(),

  });


export type MoveImportedProfileInput = z.infer<typeof moveImportedProfileSchema>;