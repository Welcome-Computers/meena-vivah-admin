// src\redux\rootMiddleware.ts

import { auditLogsApi } from "./features/auditLogs";
import { AuthApi } from "./features/login";
import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile/srevices";

export const apiMiddlewares = [
  auditLogsApi.middleware,
  profileApi.middleware,
  masterGotraApi.middleware,
  masterOccupationApi.middleware,
  AuthApi.middleware,
];