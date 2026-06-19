import { masterGotraApi } from "./features/masterGotra";
import { masterOccupationApi } from "./features/masterOccupation";
import { profileApi } from "./features/profile/srevices";

export const apiMiddlewares = [
  profileApi.middleware,
  masterGotraApi.middleware,
  masterOccupationApi.middleware,
];