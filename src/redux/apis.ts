// src\redux\apis.ts

import { auditLogsApi } from "./features/auditLogs";
import { AuthApi } from "./features/login";
import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile/srevices";

export const apis = [
  auditLogsApi,
  profileApi,
  masterGotraApi,
  masterOccupationApi,
  AuthApi,
];