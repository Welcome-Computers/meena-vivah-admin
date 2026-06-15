export type CreateGotraDto = {
  name: string;
};

export type UpdateGotraDto = {
  id: number;
  code?: string;
  name?: string;
};

export type GetGotraProps = {
  page?: number;
  limit?: number;
   search?:string;
   sortField?: string;
  sortOrder?: string;

};
