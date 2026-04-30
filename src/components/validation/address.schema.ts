import { z } from "zod";

const addresschema = z.object({
  full_address: z
    .string()
    .min(1, "Address is required")
    .min(4, "address must be 4 chracters")
    .optional(),
  tehsil: z.string().min(4, "tehsil must be minimum 4 chracters").optional(),
  state: z.string().min(3, "state must be minimum 3 chracters").optional(),
  city: z.string().min(4, "tehcitysil must be minimum 4 chracters").optional(),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/)
    .optional(),
  type: z.enum(["Premanent", "Current"]),
});

export const addresschemaList = z.array(addresschema);
