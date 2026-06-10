export type GetUsersProps = {
  action?: "matches" | "list" | undefined,

  page?: number;
  limit?: number;

  occupation?: string;
  gender?: string;

  query?: any;

  min_age?: number;
  max_age?: number;

  gotra_self?: string;
  gotra_mother?: string;
  gotra_grandmother?: string;
  gotra_grandmother_maternal?: string;
};


export type GetMatchedUsersProps = {
  page?: number;
  limit?: number;

  looking_for?: string;

  preferredAge?: [number, number];

  req_occupation?: string[];

  exclude_gotra?: string[];
};
