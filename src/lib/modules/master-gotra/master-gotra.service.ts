import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { masterGotra } from '../../schema/masterGotra';


import {
  CreateGotraDto,
  UpdateGotraDto,
} from "./master-gotra.types";

export const getGotras =
  async () => {
    return db
      .select()
      .from(masterGotra);
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