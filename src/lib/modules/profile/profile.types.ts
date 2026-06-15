export type GetProfilesProps = {
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


export type GetMatchedProfilesProps = {
  page?: number;
  limit?: number;
  action?: string;

  looking_for?: string;

  preferredAge?: [number, number];

  req_occupation?: string[];

  exclude_gotra?: string[];
};
