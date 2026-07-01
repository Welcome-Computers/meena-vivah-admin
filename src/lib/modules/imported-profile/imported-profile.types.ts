// imported-profile.types.ts

export type GetImportedProfilesProps = {
  page?: number;
  limit?: number;
  draft?: "draft" | "reviewed" | "moved" | "rejected";
};


export type FailedProfile = {
  id: number;
  error: {
    field: string;
    message: string;
  }[];
};

