import { ROLE_TYPES, STATUS_TYPES } from "../admin/admin.types";

export type GetProfilesProps = {
  action?: "matches" | "list" | undefined,

  page?: number;
  limit?: number;
  role?: ROLE_TYPES;
  mobile?: string;

  occupation?: string;
  gender?: string;

  query?: any;

  min_age?: number;
  max_age?: number;

  self_gotra?: string;
  m_gotra?: string;
  gm_gotra?: string;
  mat_gm_gotra?: string;

  status?: STATUS_TYPES[];

};


export type GetMatchedProfilesProps = {
  page?: number;
  limit?: number;
  action?: "matches";
  role?: ROLE_TYPES;
  status?: STATUS_TYPES[];
  looking_for?: string;
  preferredAge?: [number, number];
  req_occupation?: string[];
  exclude_gotra?: string[];
};

export type moveBulkProfilesProps = {
  id: number;
  dob: string | undefined;
  name: string;
  mobile: string;
  fathersname: string;
  otherinfo: string;
}[];