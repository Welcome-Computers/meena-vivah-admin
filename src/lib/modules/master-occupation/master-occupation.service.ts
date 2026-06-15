import { db } from "@/lib/db";
import { asc, desc, eq, ilike, like } from "drizzle-orm";
import { masterOccupation } from '../../schema/masterOccupation';


import {
  CreateOccupationDto,
  UpdateOccupationDto,
} from "./master-occupation.types";


// export const getOccupations =
//   async (search?:string) => {
//     if(search){
//       return db.select().from(masterOccupation)
//       .where(like(masterOccupation.name,`%${search}%`))
//     }
//     return db
//       .select()
//       .from(masterOccupation);
//   };

export const getOccupations =
  async ({search ,sortField,sortOrder}:{search:string ,sortField:string,sortOrder:string}) => {
    let query=db.select().from(masterOccupation).$dynamic();
    if(search){
      query=query.where(like(masterOccupation.name,`%${search}%`))
    }

     if(sortField == "name"){
      query=query.orderBy((sortOrder === "ascend") ?asc(masterOccupation.name) : desc(masterOccupation.name))
    }

     if(sortField == "code"){
      query=query.orderBy((sortOrder === "ascend") ?asc(masterOccupation.code) : desc(masterOccupation.code))
    }

    return query;
  };



export const getOccupationById =
  async (id: number) => {
    const rows =
      await db
        .select()
        .from(masterOccupation)
        .where(
          eq(
            masterOccupation.id,
            id
          )
        );

    return rows[0];
  };


export const createOccupation = async (data: CreateOccupationDto | CreateOccupationDto[]) => {

  const items = Array.isArray(data) ? data : [data];

  return db.transaction(async (tx) => {


    const created = [];

    for (const item of items) {

      const existing = await tx
        .select({ id: masterOccupation.id })
        .from(masterOccupation)
        .where(eq(masterOccupation.name, item.name))
        .limit(1);

      if (existing.length) {
        throw new Error(
          `occupation '${item.name}' already exists`
        );
      }

      const result = await tx
        .insert(masterOccupation)
        .values({
          name: item.name,
          code: "",
        });

      const insertId = result[0].insertId;

      const code = `OCC${String(insertId).padStart(4, "0")}`;

      await tx
        .update(masterOccupation)
        .set({ code })
        .where(eq(masterOccupation.id, insertId));

      created.push({
        id: insertId,
        code,
        name: item.name,
      });
    }

    return created;
  });
};

export const updateOccupation =
  async (
    data: UpdateOccupationDto
  ) => {
    const { id, ...payload } = data;

    return db
      .update(masterOccupation)
      .set(payload)
      .where(
        eq(
          masterOccupation.id,
          id
        )
      );
  };

export const deleteOccupation =
  async (id: number) => {
    return db
      .delete(masterOccupation)
      .where(
        eq(
          masterOccupation.id,
          id
        )
      );
  };