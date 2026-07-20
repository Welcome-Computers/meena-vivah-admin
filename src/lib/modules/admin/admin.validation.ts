// src/lib/modules/auth/admin.validation.ts

import { z } from "zod";

export const saveUserTokenSchema = z.object({
  userId: z.number().int().positive(),

  userType: z.enum([
    "admin",
    "profile",
    "executive",
  ]),

  refreshToken: z.string().min(20),

  tokenVersion: z.number().int().nonnegative().optional(),

  deviceName: z
    .string()
    .max(150)
    .optional(),

  ipAddress: z
    .string()
    .max(45)
    .optional(),

  userAgent: z
    .string()
    .max(500)
    .optional(),

  expiresAt: z.coerce.date(),
});

export type SaveUserTokenInput = z.infer<
  typeof saveUserTokenSchema
>;