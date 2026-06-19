import { AuthApi } from "./features/login";
import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile/srevices";

export const apis = [
  profileApi,
  masterGotraApi,
  masterOccupationApi,
  AuthApi,
];