// imported-profile.service.ts

import {
  and, desc, eq,
  inArray,
  sql
} from "drizzle-orm";

import { db } from "@/lib/db";

import { importedProfile } from "@/lib/schema/importedProfile";
import { masterGotra } from "@/lib/schema/masterGotra";
import { profiles } from "@/lib/schema/profiles";

import { alias } from "drizzle-orm/mysql-core";
import { GetImportedProfilesProps } from "./imported-profile.types";

import { CreateImportedProfileInput, moveImportedProfileSchema, UpdateImportedProfileInput } from "./imported-profile.validation";

const selfGotra = alias(masterGotra, "selfGotra");
const motherGotra = alias(masterGotra, "motherGotra");
const grandmotherGotra = alias(masterGotra, "grandmotherGotra");
const maternalGrandmotherGotra = alias(masterGotra, "maternalGrandmotherGotra");

export const userSelect = {
  id: importedProfile.id,
  mobile: importedProfile.mobile,
  gender: importedProfile.gender,
  name: importedProfile.name,
  dob: importedProfile.dob,
  fathersname: importedProfile.fathersname,
  status: importedProfile.status,
  otherinfo: importedProfile.otherinfo,
  self_gotra: selfGotra.code,
  self_gotra_name: selfGotra.name,
  m_gotra: motherGotra.code,
  m_gotra_name: motherGotra.name,
  gm_gotra: grandmotherGotra.code,
  gm_gotra_name: grandmotherGotra.name,
  mat_gm_gotra: maternalGrandmotherGotra.code,
  mat_gm_gotra_name: maternalGrandmotherGotra.name,
};

async function getBaseImportedProfiles(
  conditions: any[],
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  return await db
    .select(userSelect)
    .from(importedProfile)

    .leftJoin(
      selfGotra,
      sql`${importedProfile.self_gotra} COLLATE utf8mb4_unicode_ci = ${selfGotra.code}`
    )

    .leftJoin(
      motherGotra,
      sql`${importedProfile.m_gotra} COLLATE utf8mb4_unicode_ci = ${motherGotra.code}`
    )

    .leftJoin(
      grandmotherGotra,
      sql`${importedProfile.gm_gotra} COLLATE utf8mb4_unicode_ci = ${grandmotherGotra.code}`
    )

    .leftJoin(
      maternalGrandmotherGotra,
      sql`${importedProfile.mat_gm_gotra} COLLATE utf8mb4_unicode_ci = ${maternalGrandmotherGotra.code}`
    )

    .where(and(...conditions))
    .orderBy(desc(importedProfile.id))
    .limit(limit)
    .offset(offset);
}

export async function getImportedProfiles(
  params: GetImportedProfilesProps
) {
  const {
    page = 1,
    limit = 10,
  } = params;

  // console.log("profile default ", params)

  const conditions = [eq(importedProfile.status, "draft"),];
  // filters add here...

  const data = await getBaseImportedProfiles(conditions, page, limit);


  const [totalResult] = await db.select({ count: sql<number>`count(*)`, })
    .from(importedProfile)
    .where(
      and(...conditions)
    );

  const total =
    Number(totalResult.count);

  return {
    data,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit), },
  };
}

export async function createImportedProfile(
  payload: CreateImportedProfileInput
) {

  console.log(payload)

  return await db.transaction(
    async (tx) => {

      /**
       * PROFILE
       */
      const [userResult] =
        await tx
          .insert(importedProfile)
          .values({
            mobile: payload.mobile,
            gender: payload.gender,
            name: payload.name,
            dob: payload.dob,
            fathersname: payload.fathersname,
            self_gotra: payload.self_gotra,
            m_gotra: payload.m_gotra,
            gm_gotra: payload.gm_gotra,
            mat_gm_gotra: payload.mat_gm_gotra,
            otherinfo: payload.otherinfo,
            status: payload.status,
          })
          .$returningId();

      return userResult;
    }
  );
}

export async function updateImportedProfile(
  userId: number,
  payload: UpdateImportedProfileInput
) {
  return await db.transaction(async (tx) => {

    /**
     * PROFILE
     */
    await tx
      .update(importedProfile)
      .set({
        mobile: payload.mobile,
        gender: payload.gender,
        name: payload.name,
        dob: payload.dob,
        fathersname: payload.fathersname,
        self_gotra: payload.self_gotra,
        m_gotra: payload.m_gotra,
        gm_gotra: payload.gm_gotra,
        mat_gm_gotra: payload.mat_gm_gotra,
        otherinfo: payload.otherinfo,
        status: payload.status,
      })
      .where(eq(importedProfile.id, userId));

    return { id: userId };
  });
}

export async function createBulkImportedProfiles(
  payloads: CreateImportedProfileInput[]
) {

  return await db.transaction(async (tx) => {

    /**
     * 1. INSERT ALL PROFILES
     */
    const profileRows = payloads.map((payload) => ({
      mobile: payload.mobile,
      gender: payload.gender,
      name: payload.name,
      dob: payload.dob,

      fathersname: payload.fathersname,

      self_gotra: payload.self_gotra,
      m_gotra: payload.m_gotra,
      gm_gotra: payload.gm_gotra,
      mat_gm_gotra: payload.mat_gm_gotra,

      otherinfo: payload.otherinfo,

      status: payload.status ?? "draft",
    }));


    const insertedProfiles =
      await tx
        .insert(importedProfile)
        .values(profileRows)
        .$returningId();

    return insertedProfiles;

  });

}

export async function deleteImportedProfile(
  id: number
) {
  await db
    .delete(importedProfile)
    .where(
      eq(importedProfile.id, id)
    );

  return { id };
}

export async function deleteImportedProfiles(
  ids: number[]
) {

  await db
    .delete(importedProfile)
    .where(
      inArray(
        importedProfile.id,
        ids
      )
    );

  return {
    deleted: ids.length
  };
}

export async function moveImportedProfile(
  id: number
) {

  return db.transaction(
    async (tx) => {

      const [item] =
        await tx
          .select()
          .from(importedProfile)
          .where(
            eq(
              importedProfile.id,
              id
            )
          );


      if (!item) {
        throw new Error(
          "Profile not found"
        );
      }


      /**
       * VALIDATE BEFORE MOVE
       */
      const validatedProfile =
        moveImportedProfileSchema.parse(item);

      /**
       * MOVE TO PROFILE TABLE
       */
      const profile =
        await tx
          .insert(profiles)
          .values({
            name: validatedProfile.name,
            mobile: validatedProfile.mobile,
            gender: validatedProfile.gender,
            fathersname: validatedProfile.fathersname,
            self_gotra: validatedProfile.self_gotra,
            m_gotra: validatedProfile.m_gotra,
            gm_gotra: validatedProfile.gm_gotra,
            mat_gm_gotra: validatedProfile.mat_gm_gotra,
            otherinfo: validatedProfile.otherinfo,
            status: "draft",
            dob:
              validatedProfile.dob
                ? new Date(validatedProfile.dob)
                : null,
            height: null,
            education: null,
            occupation: null,
          })
          .$returningId();


      /**
       * MARK IMPORTED RECORD AS MOVED
       */
      await tx
        .update(importedProfile)
        .set({
          status: "moved"
        })
        .where(
          eq(
            importedProfile.id,
            id
          )
        );


      return profile;

    }
  );
}

export async function moveImportedProfiles(
  ids: number[]
) {

  let moved = 0;

  const errors: {
    id: number;
    error: string;
  }[] = [];


  for (const id of ids) {

    try {

      await db.transaction(
        async (tx) => {


          const [item] =
            await tx
              .select()
              .from(importedProfile)
              .where(
                eq(
                  importedProfile.id,
                  id
                )
              );


          if (!item) {
            throw new Error(
              "Profile not found"
            );
          }


          const validatedProfile =
            moveImportedProfileSchema.parse(item);



          await tx
            .insert(profiles)
            .values({

              name:
                validatedProfile.name,

              mobile:
                validatedProfile.mobile,

              gender:
                validatedProfile.gender,


              fathersname:
                validatedProfile.fathersname,


              self_gotra:
                validatedProfile.self_gotra,

              m_gotra:
                validatedProfile.m_gotra,

              gm_gotra:
                validatedProfile.gm_gotra,

              mat_gm_gotra:
                validatedProfile.mat_gm_gotra,


              otherinfo:
                validatedProfile.otherinfo,


              status: "draft",


              dob:
                validatedProfile.dob
                  ? new Date(validatedProfile.dob)
                  : null,

            });



          await tx
            .update(importedProfile)
            .set({
              status: "moved"
            })
            .where(
              eq(
                importedProfile.id,
                id
              )
            );


        });


      moved++;


    } catch (error) {


      if (error instanceof Error) {

        errors.push({
          id,
          error: error.message
        });

      }
      else {

        errors.push({
          id,
          error: "Unknown error"
        });

      }

    }

  }


  return {
    moved,
    failed: errors.length,
    errors
  };

}