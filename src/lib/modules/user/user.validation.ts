import { z } from "zod";

export const createUserSchema =
  z.object({
    name:
      z.string().min(2),

    gender:
      z.string(),

    dob:
      z.coerce
        .date()
        .optional(),

    education:
      z.string().optional(),

    occupation:
      z.string().optional(),

    father_name:
      z.string().optional(),

    mother_name:
      z.string().optional(),

    father_occupation:
      z.string().optional(),

    mother_occupation:
      z.string().optional(),

    gotra_self:
      z.string().optional(),

    gotra_mother:
      z.string().optional(),

    gotra_grandmother:
      z.string().optional(),

    gotra_grandmother_maternal:
      z.string().optional(),

    preferences:
      z.string().optional(),

    other_details:
      z.string().optional(),

    /**
     * MOBILE DETAILS
     */
    mobile_details:
      z.array(
        z.object({
          mobile:
            z.string().min(10),
        })
      ),

    /**
     * ADDRESS DETAILS
     */
    address_details:
      z.array(
        z.object({
          full_address:
            z.string(),

          state:
            z.string(),

          tehsil:
            z.string(),

          city:
            z.string(),

          pincode:
            z.string(),

          type:
            z.string(),
        })
      ).optional(),

    /**
     * SIBLING DETAILS
     */
    sibling_details:
      z.array(
        z.object({
          relation:
            z.string(),

          sibling_name:
            z.string(),

          sibling_education:
            z.string(),

          sibling_occupation:
            z.string(),
        })
      ).optional(),

    /**
     * OTHER GOTRA
     */
    other_gotra:
      z.array(
        z.object({
          other_gotra_relation:
            z.string(),

          other_gotra_name:
            z.string(),
        })
      ).optional(),
  });

export const updateUserSchema =
  z.object({
    id: z.number(),

    name:
      z.string().optional(),

    education:
      z.string().optional(),

    occupation:
      z.string().optional(),
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;