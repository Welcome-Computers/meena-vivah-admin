import {
  and, desc, eq, gte, inArray, lte, ne, notInArray, sql
} from "drizzle-orm";

import { db } from "@/lib/db";

import { addresses } from "@/lib/schema/address";
import { masterGotra } from "@/lib/schema/masterGotra";
import { otherGotras } from '@/lib/schema/otherGotra';
import { profiles } from "@/lib/schema/profile";
import { siblingDetails } from "@/lib/schema/sibling";

import { masterOccupation } from "@/lib/schema/masterOccupation";
import { alias } from "drizzle-orm/mysql-core";
import { GetMatchedProfilesProps, GetProfilesProps } from "./profile.types";
import { CreateProfileInput, UpdateProfileInput } from "./profile.validation";

const fatherOccupation = alias(masterOccupation, "fatherOccupation");
const motherOccupation = alias(masterOccupation, "motherOccupation");
const siblingOccupation = alias(masterOccupation, "siblingOccupation");

const selfGotra = alias(masterGotra, "selfGotra");
const motherGotra = alias(masterGotra, "motherGotra");
const grandmotherGotra = alias(masterGotra, "grandmotherGotra");
const maternalGrandmotherGotra = alias(masterGotra, "maternalGrandmotherGotra");
const otherGotraMaster = alias(masterGotra, "otherGotraMaster");

export const userSelect = {
  id: profiles.id,
  mobile: profiles.mobile,
  gender: profiles.gender,
  name: profiles.name,
  dob: profiles.dob,
  height: profiles.height,
  education: profiles.education,
  fathersname: profiles.fathersname,
  mothersname: profiles.mothersname,
  fathersoccupation: fatherOccupation.code,
  fathersoccupation_name: fatherOccupation.name,
  mothersoccupation: motherOccupation.code,
  mothersoccupation_name: motherOccupation.name,
  preferences: profiles.preferences,
  otherinfo: profiles.otherinfo,
  isSuspended: profiles.isSuspended,
  createdAt: profiles.createdAt,
  occupation: masterOccupation.code,
  occupation_details: profiles.occupation_details,
  occupation_name: masterOccupation.name,
  self_gotra: selfGotra.code,
  self_gotra_name: selfGotra.name,
  m_gotra: motherGotra.code,
  m_gotra_name: motherGotra.name,
  gm_gotra: grandmotherGotra.code,
  gm_gotra_name: grandmotherGotra.name,
  mat_gm_gotra: maternalGrandmotherGotra.code,
  mat_gm_gotra_name: maternalGrandmotherGotra.name,
};

async function getBaseProfiles(
  conditions: any[],
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  return await db
    .select(userSelect)
    .from(profiles)

    .leftJoin(
      masterOccupation,
      sql`${profiles.occupation} COLLATE utf8mb4_unicode_ci = ${masterOccupation.code}`
    )

    .leftJoin(
      fatherOccupation,
      sql`${profiles.fathersoccupation} COLLATE utf8mb4_unicode_ci = ${fatherOccupation.code}`
    )

    .leftJoin(
      motherOccupation,
      sql`${profiles.mothersoccupation} COLLATE utf8mb4_unicode_ci = ${motherOccupation.code}`
    )

    .leftJoin(
      selfGotra,
      sql`${profiles.self_gotra} COLLATE utf8mb4_unicode_ci = ${selfGotra.code}`
    )

    .leftJoin(
      motherGotra,
      sql`${profiles.m_gotra} COLLATE utf8mb4_unicode_ci = ${motherGotra.code}`
    )

    .leftJoin(
      grandmotherGotra,
      sql`${profiles.gm_gotra} COLLATE utf8mb4_unicode_ci = ${grandmotherGotra.code}`
    )

    .leftJoin(
      maternalGrandmotherGotra,
      sql`${profiles.mat_gm_gotra} COLLATE utf8mb4_unicode_ci = ${maternalGrandmotherGotra.code}`
    )

    .where(and(...conditions))
    .orderBy(desc(profiles.id))
    .limit(limit)
    .offset(offset);
}

async function attachProfileRelations(
  data: any[]
) {
  const userIds =
    data.map((u) => u.id);

  if (!userIds.length)
    return [];

  const [
    allAddresses,
    allSiblings,
    allOtherGotras,
  ] = await Promise.all([
    db
      .select()
      .from(addresses)
      .where(
        inArray(
          addresses.user_id,
          userIds
        )
      ),

    db
      .select({
        id: siblingDetails.id,
        user_id: siblingDetails.user_id,
        relation: siblingDetails.relation,
        name: siblingDetails.name,
        education: siblingDetails.education,
        occupation: siblingOccupation.code,
        occupation_name: siblingOccupation.name,
      })
      .from(siblingDetails)

      .leftJoin(
        siblingOccupation,
        sql`${siblingDetails.occupation} COLLATE utf8mb4_unicode_ci = ${siblingOccupation.code}`
      )

      .where(
        inArray(
          siblingDetails.user_id,
          userIds
        )
      ),

    db
      .select({
        id: otherGotras.id,
        user_id: otherGotras.user_id,
        other_gotra_relation: otherGotras.other_gotra_relation,
        other_gotra: otherGotraMaster.code,
        other_gotra_name: otherGotraMaster.name,
      })
      .from(otherGotras)

      .leftJoin(
        otherGotraMaster,
        sql`${otherGotras.other_gotra_name} COLLATE utf8mb4_unicode_ci = ${otherGotraMaster.code}`
      )

      .where(
        inArray(
          otherGotras.user_id,
          userIds
        )
      ),
  ]);

  const addressMap = new Map();
  const siblingMap = new Map();
  const otherGotraMap = new Map();

  allAddresses.forEach(
    (item) => {
      const arr =
        addressMap.get(
          item.user_id
        ) || [];

      arr.push(item);

      addressMap.set(
        item.user_id,
        arr
      );
    }
  );

  allSiblings.forEach(
    (item) => {
      const arr =
        siblingMap.get(
          item.user_id
        ) || [];

      arr.push(item);

      siblingMap.set(
        item.user_id,
        arr
      );
    }
  );

  allOtherGotras.forEach(
    (item) => {
      const arr =
        otherGotraMap.get(
          item.user_id
        ) || [];

      arr.push(item);

      otherGotraMap.set(
        item.user_id,
        arr
      );
    }
  );

  return data.map(
    (profile) => ({
      ...profile,

      address_details: addressMap.get(profile.id) || [],
      sibling_details: siblingMap.get(profile.id) || [],
      other_gotra: otherGotraMap.get(profile.id) || [],
    })
  );
}

export async function getProfiles(
  params: GetProfilesProps
) {
  const {
    page = 1,
    limit = 10,
  } = params;

  // console.log("profile default ", params)

  const conditions = [eq(profiles.isSuspended, false),];
  // filters add here...

  const data = await getBaseProfiles(conditions, page, limit);

  const finalData = await attachProfileRelations(data);
  const [totalResult] = await db.select({ count: sql<number>`count(*)`, })
    .from(profiles)
    .where(
      and(...conditions)
    );

  const total =
    Number(totalResult.count);

  return {
    data: finalData,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit), },
  };
}

export async function getProfileMatches(
  params: GetMatchedProfilesProps
) {
  const {
    page = 1,
    limit = 10,

    looking_for,
    preferredAge,
    req_occupation,
    exclude_gotra,
  } = params;

  const conditions = [eq(profiles.isSuspended, false),];

  /**
   * OCCUPATION
   */
  if (
    req_occupation &&
    req_occupation.length > 0
  ) {
    conditions.push(
      inArray(
        profiles.occupation,
        req_occupation
      )
    );
  }

  /**
   * GENDER
   */
  if (looking_for) {
    conditions.push(
      ne(
        profiles.gender,
        looking_for
      )
    );
  }

  /**
   * EXCLUDE GOTRA
   */
  if (
    exclude_gotra &&
    exclude_gotra.length > 0
  ) {
    conditions.push(
      notInArray(
        profiles.self_gotra,
        exclude_gotra
      )
    );

    conditions.push(
      notInArray(
        profiles.m_gotra,
        exclude_gotra
      )
    );

    conditions.push(
      notInArray(
        profiles.gm_gotra,
        exclude_gotra
      )
    );

    conditions.push(
      notInArray(
        profiles.mat_gm_gotra,
        exclude_gotra
      )
    );
  }

  /**
   * AGE
   */
  if (
    preferredAge &&
    preferredAge.length === 2
  ) {
    const [minAge, maxAge] = preferredAge;

    const today = new Date();

    const maxDob = new Date();

    maxDob.setFullYear(today.getFullYear() - minAge);

    const minDob = new Date();

    minDob.setFullYear(today.getFullYear() - (maxAge - 1));

    conditions.push(gte(profiles.dob, minDob));
    conditions.push(lte(profiles.dob, maxDob));
  }

  const data = await getBaseProfiles(conditions, page, limit);

  const finalData = await attachProfileRelations(data);

  const [totalResult] =
    await db.select({
      count: sql<number>`count(*)`,
    })
      .from(profiles)
      .where(
        and(...conditions)
      );

  const total =
    Number(totalResult.count);

  return {
    data: finalData,

    pagination: { total, page, limit, totalPages: Math.ceil(total / limit), },
  };
}

export async function createProfile(
  payload: CreateProfileInput
) {

  console.log(payload)

  return await db.transaction(
    async (tx) => {

      /**
       * PROFILE
       */
      const [userResult] =
        await tx
          .insert(profiles)
          .values({
            // other_mobile:
            //   payload.other_mobile,

            mobile: payload.mobile,
            gender: payload.gender,
            name: payload.name,
            dob: payload.dob,
            height: payload.height,
            education: payload.education,
            occupation: payload.occupation,
            occupation_details: payload.occupation_details,
            fathersname: payload.fathersname,
            mothersname: payload.mothersname,
            fathersoccupation: payload.fathersoccupation,
            mothersoccupation: payload.mothersoccupation,
            self_gotra: payload.self_gotra,
            m_gotra: payload.m_gotra,
            gm_gotra: payload.gm_gotra,
            mat_gm_gotra: payload.mat_gm_gotra,
            preferences: payload.preferences,
            otherinfo: payload.otherinfo,
          })
          .$returningId();

      const userId = userResult.id;

      /**
       * ADDRESS
       */
      if (payload.address_details?.length) {

        await tx
          .insert(addresses)
          .values(
            payload.address_details.map(
              (item) => ({
                user_id: userId,
                address: item.full_address,
                state: item.state,
                city: item.city,
                pincode: item.pincode,
                type: item.type,
              })
            )
          );
      }

      /**
       * SIBLINGS
       */
      if (payload.sibling_details?.length) {

        await tx
          .insert(siblingDetails)
          .values(
            payload.sibling_details.map(
              (item) => ({
                user_id: userId,
                relation: item.relation,
                name: item.sibling_name,
                education: item.sibling_education,
                occupation: item.sibling_occupation,
              })
            )
          );
      }

      /**
       * OTHER GOTRA
       */
      if (payload.other_gotra?.length) {

        await tx
          .insert(otherGotras)
          .values(
            payload.other_gotra.map(
              (item) => ({
                user_id: userId,
                other_gotra_relation: item.other_gotra_relation,
                other_gotra_name: item.other_gotra_name,
              })
            )
          );
      }

      return userResult;
    }
  );
}

export async function getProfileById1(
  id: number
) {

  const [profile] = await db.select({
    id: profiles.id,
    mobile: profiles.mobile,
    gender: profiles.gender,
    name: profiles.name,
    dob: profiles.dob,
    height: profiles.height,
    education: profiles.education,

    fathersname: profiles.fathersname,
    mothersname: profiles.mothersname,
    fathersoccupation: profiles.fathersoccupation,
    mothersoccupation: profiles.mothersoccupation,

    preferences: profiles.preferences,
    otherinfo: profiles.otherinfo,

    occupation: masterOccupation.code,

    self_gotra: selfGotra.code,
    m_gotra: motherGotra.code,
    gm_gotra: grandmotherGotra.code,
    mat_gm_gotra: maternalGrandmotherGotra.code,
  })
    .from(profiles)

    .leftJoin(
      masterOccupation,
      sql`${profiles.occupation} COLLATE utf8mb4_unicode_ci = ${masterOccupation.code}`
    )

    .leftJoin(
      selfGotra,
      sql`${profiles.self_gotra} COLLATE utf8mb4_unicode_ci = ${selfGotra.code}`
    )

    .leftJoin(
      motherGotra,
      sql`${profiles.m_gotra} COLLATE utf8mb4_unicode_ci = ${motherGotra.code}`
    )

    .leftJoin(
      grandmotherGotra,
      sql`${profiles.gm_gotra} COLLATE utf8mb4_unicode_ci = ${grandmotherGotra.code}`
    )

    .leftJoin(
      maternalGrandmotherGotra,
      sql`${profiles.mat_gm_gotra} COLLATE utf8mb4_unicode_ci = ${maternalGrandmotherGotra.code}`
    )

    .where(eq(profiles.id, id))
    .limit(1);
  // .then(rows => rows[0] ?? null);

  return profile;
}

export async function getProfileById(
  id: number
) {
  const data = await getBaseProfiles(
    [eq(profiles.id, id)],
    1,
    1
  );

  const [profile] =
    await attachProfileRelations(data);

  return profile || null;
}

export async function updateProfile(
  userId: number,
  payload: UpdateProfileInput
) {
  return await db.transaction(async (tx) => {

    /**
     * PROFILE
     */
    await tx
      .update(profiles)
      .set({
        mobile: payload.mobile,
        gender: payload.gender,
        name: payload.name,
        dob: payload.dob,
        height: payload.height,
        education: payload.education,
        occupation: payload.occupation,
        occupation_details: payload.occupation_details,
        fathersname: payload.fathersname,
        mothersname: payload.mothersname,
        fathersoccupation: payload.fathersoccupation,
        mothersoccupation: payload.mothersoccupation,
        self_gotra: payload.self_gotra,
        m_gotra: payload.m_gotra,
        gm_gotra: payload.gm_gotra,
        mat_gm_gotra: payload.mat_gm_gotra,
        preferences: payload.preferences,
        otherinfo: payload.otherinfo,
      })
      .where(eq(profiles.id, userId));

    /**
     * ADDRESS
     */
    await tx
      .delete(addresses)
      .where(eq(addresses.user_id, userId));

    if (payload.address_details?.length) {
      await tx.insert(addresses).values(
        payload.address_details.map((item) => ({
          user_id: userId,
          address: item.full_address,
          state: item.state,
          city: item.city,
          pincode: item.pincode,
          type: item.type,
        }))
      );
    }

    /**
     * SIBLINGS
     */
    await tx
      .delete(siblingDetails)
      .where(eq(siblingDetails.user_id, userId));

    if (payload.sibling_details?.length) {
      await tx.insert(siblingDetails).values(
        payload.sibling_details.map((item) => ({
          user_id: userId,
          relation: item.relation,
          name: item.sibling_name,
          education: item.sibling_education,
          occupation: item.sibling_occupation,
        }))
      );
    }

    /**
     * OTHER GOTRA
     */
    await tx
      .delete(otherGotras)
      .where(eq(otherGotras.user_id, userId));

    if (payload.other_gotra?.length) {
      await tx.insert(otherGotras).values(
        payload.other_gotra.map((item) => ({
          user_id: userId,
          other_gotra_relation: item.other_gotra_relation,
          other_gotra_name: item.other_gotra_name,
        }))
      );
    }

    return { id: userId };
  });
}

export async function suspendProfile(
  id: number
) {

  await db
    .update(profiles)
    .set({
      isSuspended: true,
    })
    .where(
      eq(profiles.id, id)
    );

  return true;
}
export async function activeProfile(
  id: number
) {

  await db
    .update(profiles)
    .set({
      isSuspended: false,
    })
    .where(
      eq(profiles.id, id)
    );

  return true;
}


export async function getProfileByMobile(
  mobile: string
) {
  const data = await db
    .select({
      id: profiles.id,
      name: profiles.name,
      mobile: profiles.mobile,
      gender: profiles.gender,
      dob: profiles.dob,
      occupation: masterOccupation.name,
    })
    .from(profiles)
    .leftJoin(
      masterOccupation,
      sql`${profiles.occupation} COLLATE utf8mb4_unicode_ci = ${masterOccupation.code}`
    )
    .where(
      and(
        eq(profiles.mobile, mobile),
        eq(profiles.isSuspended, false)
      )
    );

  return data;
}