import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { masterOccupation } from '../../schema/masterOccupation';


import {
  CreateOccupationDto,
  UpdateOccupationDto,
} from "./master-occupation.types";

export const getOccupations =
  async () => {
    return db
      .select()
      .from(masterOccupation);
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