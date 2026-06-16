import { db } from "@/lib/db";
import { asc, desc, eq, like } from "drizzle-orm";
import { masterGotra } from '../../schema/masterGotra';


import {
  CreateGotraDto,
  UpdateGotraDto,
} from "./master-gotra.types";

export const getGotras =
  async ({search ,sortField,sortOrder}:{search:string ,sortField:string,sortOrder:string}) => {
    let query=db.select().from(masterGotra).$dynamic();
   if(search){
        query=query.where(like(masterGotra.name,`%${search}%`))
      }
  
       if(sortField == "name"){
        query=query.orderBy((sortOrder === "ascend") ?asc(masterGotra.name) : desc(masterGotra.name))
      }
  
       if(sortField == "code"){
        query=query.orderBy((sortOrder === "ascend") ?asc(masterGotra.code) : desc(masterGotra.code))
      }
  
      return query;
  };
  
export const getGotraById =
  async (id: number) => {
    const rows =
      await db
        .select()
        .from(masterGotra)
        .where(
          eq(
            masterGotra.id,
            id
          )
        );

    return rows[0];
  };


export const createGotra = async (data: CreateGotraDto | CreateGotraDto[]) => {

  const items = Array.isArray(data) ? data : [data];

  return db.transaction(async (tx) => {


    const created = [];

    for (const item of items) {

      const existing = await tx
        .select({ id: masterGotra.id })
        .from(masterGotra)
        .where(eq(masterGotra.name, item.name))
        .limit(1);

      if (existing.length) {
        throw new Error(
          `Gotra '${item.name}' already exists`
        );
      }

      const result = await tx
        .insert(masterGotra)
        .values({
          name: item.name,
          code: "",
        });

      const insertId = result[0].insertId;

      const code = `GOT${String(insertId).padStart(4, "0")}`;

      await tx
        .update(masterGotra)
        .set({ code })
        .where(eq(masterGotra.id, insertId));

      created.push({
        id: insertId,
        code,
        name: item.name,
      });
    }

    return created;
  });
};


export const updateGotra =
  async (
    data: UpdateGotraDto
  ) => {
    const { id, ...payload } = data;

    return db
      .update(masterGotra)
      .set(payload)
      .where(
        eq(
          masterGotra.id,
          id
        )
      );
  };


export const deleteGotra =
  async (id: number) => {
    return db
      .delete(masterGotra)
      .where(
        eq(
          masterGotra.id,
          id
        )
      );
  };