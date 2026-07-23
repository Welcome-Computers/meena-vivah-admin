interface IAddressDetails {
  id: number;
  user_id: number;
  address: string | null;
  tehsil: string | null;
  state: string | null;
  city: string | null;
  pincode: number | null;
  type: string | null;
}
interface IOtherGotra {
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