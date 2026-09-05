

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface ParsedProfile {
  id?: number;
  name: string;
  dob: string;
  mobile: string;

  fathersname: string;

  otherinfo: string;
}