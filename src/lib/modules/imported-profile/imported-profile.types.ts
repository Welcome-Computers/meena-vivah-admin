// imported-profile.types.ts

export type GetImportedProfilesProps = {
  page?: number;
  limit?: number;
  draft?: "draft" | "reviewed" | "moved" | "rejected";
};

