
import { z } from "zod";

// const addressSchema = z.object({
//   full_address: z.string(),
//   state: z.string(),
//   city: z.string(),
//   pincode: z.string(),
//   type: z.string(),
// });

const addressSchema = z.object({
  full_address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  type: z.string().optional(),
});

const siblingSchema = z.object({
  relation: z.string(),
  sibling_name: z.string(),
  sibling_education: z.string(),
  sibling_occupation: z.string(),
});

const otherGotraSchema = z.object({
  other_gotra_relation: z.string(),
  other_gotra_name: z.string(),
});

export const createProfileSchema =
  z.object({
    name: z.string().min(2),
    gender: z.string(),
    dob: z.coerce.date().optional(),
    height: z.number().nullable().optional(),
    education: z.string().nullable().optional(),
    occupation: z.string().nullable().optional(),
    occupation_details: z.string().nullable().optional(),
    fathersname: z.string().nullable().optional(),
    mothersname: z.string().nullable().optional(),
    fathersoccupation: z.string().nullable().optional(),
    mothersoccupation: z.string().nullable().optional(),
    self_gotra: z.string().nullable().optional(),
    m_gotra: z.string().nullable().optional(),
    gm_gotra: z.string().nullable().optional(),
    mat_gm_gotra: z.string().nullable().optional(),
    preferences: z.string().nullable().optional(),
    otherinfo: z.string().nullable().optional(),
    status: z.enum(["draft", "approved", "rejected", "suspended"]).optional(),

    /**
     * MOBILE DETAILS
     */
    mobile: z.string().min(10),
    other_mobile: z.array(z.object({ mobile: z.string().min(10), })),

    /**
     * ADDRESS DETAILS
     * SIBLING DETAILS
     * OTHER GOTRA
     */

    address_details: z.array(addressSchema).optional(),
    other_gotra: z.array(otherGotraSchema).optional(),

  });

export const updateProfileSchema = createProfileSchema
  .partial()
  .extend({
    id: z.coerce.number(),

    address_details: z.array(
      addressSchema.partial()
    ).optional(),


    other_gotra: z.array(
      otherGotraSchema.partial()
    ).optional(),
  });

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;