export type CreateOccupationDto = {
  name: string;
};

export type UpdateOccupationDto = {
  id: number;
  code?: string;
  name?: string;
};

export type GetOccupationProps = {
  page?: number;
  limit?: number;

};
