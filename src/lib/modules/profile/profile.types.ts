export type GetUsersProps = {
  action?: "matches" | "list" | undefined,

  page?: number;
  limit?: number;

  occupation?: string;
  gender?: string;

  query?: any;

  min_age?: number;
  max_age?: number;

  self_gotra?: string;
  m_gotra?: string;
  gm_gotra?: string;
  mat_gm_gotra?: string;
};


export type GetMatchedUsersProps = {
  page?: number;
  limit?: number;

  looking_for?: string;

  preferredAge?: [number, number];

  req_occupation?: string[];

  exclude_gotra?: string[];
};
