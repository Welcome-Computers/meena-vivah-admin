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
    status: z.enum(["draft", "reviewed", "moved", "rejected",]).optional(),
  });

export const updateImportedProfileSchema = createImportedProfileSchema
  .partial()
  .extend({
    id: z.coerce.number(),
  });

export type CreateImportedProfileInput = z.infer<typeof createImportedProfileSchema>;

export type UpdateImportedProfileInput = z.infer<typeof updateImportedProfileSchema>;