export interface IAddressDetails {
  id: number;
  user_id: number;
  address: string | null;
  tehsil: string | null;
  state: string | null;
  city: string | null;
  pincode: number | null;
  type: string | null;
}

export interface ISiblingDetails {
  id: number;
  user_id: number;
  relation: string | null;
  name: string | null;
  education: string | null;
  occupation: string | null;
}

export interface IOtherGotra {
  id: number;
  user_id: number;
  other_gotra_relation:
  string | null;
  other_gotra_name:
  string | null;
}

export interface IProfile {
  id: number;
  mobile: string;
  gender: string;
  name: string;
  dob: string | null;
  height: number;
  education: string;
  occupation: string;
  occupation_name: string;
  fathersname: string;
  mothersname: string;
  fathersoccupation: string;
  mothersoccupation: string;
  self_gotra: string;
  m_gotra: string;
  gm_gotra: string;
  mat_gm_gotra: string;
  self_gotra_name: string;
  m_gotra_name: string;
  gm_gotra_name: string;
  mat_gm_gotra_name: string;
  preferences: string | null;
  otherinfo: string | null;
  isSuspended: boolean;
  createdAt: string;
  /**
   * RELATIONAL DATA
   */
  address_details?: IAddressDetails[];
  other_gotra?: IOtherGotra[];
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IProfileApiResponse {
  success: boolean;
  data: IProfile[];
  pagination: IPagination;
}


export const paginationInit = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};

export type GetProfilesParams = {
  page?: number;
  limit?: number;
};

export type IGotra = {
  id?: number;
  code?: string;
  name?: string;
};


export type IOccupation = {
  id?: number;
  name?: string;
  code?: string;
};



export interface ParsedProfile {
  id: number;
  name: string;
  dob: string;
  mobile: string;

  fathersname: string;

  otherinfo: string;
}