import {
  and,
  desc,
  eq,
  gte,
  inArray,
  lte,
  ne,
  notInArray,
  sql
} from "drizzle-orm";

import { db } from "@/lib/db";

import { addresses } from "@/lib/schema/address";
import { masterGotra } from "@/lib/schema/masterGotra";
import { otherGotras } from '@/lib/schema/otherGotra';
import { users } from "@/lib/schema/profile";
import { siblingDetails } from "@/lib/schema/sibling";

import { masterOccupation } from "@/lib/schema/masterOccupation";
import { alias } from "drizzle-orm/mysql-core";
import { GetMatchedUsersProps, GetUsersProps } from "./profile.types";
import { CreateUserInput, UpdateUserInput } from "./profile.validation";

const fatherOccupation = alias(masterOccupation, "fatherOccupation");
const motherOccupation = alias(masterOccupation, "motherOccupation");

const selfGotra = alias(masterGotra, "selfGotra");
const motherGotra = alias(masterGotra, "motherGotra");
const grandmotherGotra = alias(masterGotra, "grandmotherGotra");
const maternalGrandmotherGotra = alias(masterGotra, "maternalGrandmotherGotra");

export const userSelect = {
  id: users.id,
  mobile: users.mobile,
  gender: users.gender,
  name: users.name,
  dob: users.dob,
  education: users.education,

  fathersname: users.fathersname,
  mothersname: users.mothersname,

  fathersoccupation:
    fatherOccupation.name,

  mothersoccupation:
    motherOccupation.name,

  preferences:
    users.preferences,

  otherinfo:
    users.otherinfo,

  isSuspended:
    users.isSuspended,

  createdAt:
    users.createdAt,

  occupation:
    masterOccupation.name,

  self_gotra:
    selfGotra.name,

  m_gotra:
    motherGotra.name,

  gm_gotra:
    grandmotherGotra.name,

  mat_gm_gotra:
    maternalGrandmotherGotra.name,
};

async function getBaseUsers(
  conditions: any[],
  page: number,
  limit: number
) {
  const offset =
    (page - 1) * limit;

  return await db
    .select(userSelect)
    .from(users)

    .leftJoin(
      masterOccupation,
      sql`${users.occupation} COLLATE utf8mb4_unicode_ci = ${masterOccupation.code}`
    )

    .leftJoin(
      fatherOccupation,
      sql`${users.fathersoccupation} COLLATE utf8mb4_unicode_ci = ${fatherOccupation.code}`
    )

    .leftJoin(
      motherOccupation,
      sql`${users.mothersoccupation} COLLATE utf8mb4_unicode_ci = ${motherOccupation.code}`
    )

    .leftJoin(
      selfGotra,
      sql`${users.self_gotra} COLLATE utf8mb4_unicode_ci = ${selfGotra.code}`
    )

    .leftJoin(
      motherGotra,
      sql`${users.m_gotra} COLLATE utf8mb4_unicode_ci = ${motherGotra.code}`
    )

    .leftJoin(
      grandmotherGotra,
      sql`${users.gm_gotra} COLLATE utf8mb4_unicode_ci = ${grandmotherGotra.code}`
    )

    .leftJoin(
      maternalGrandmotherGotra,
      sql`${users.mat_gm_gotra} COLLATE utf8mb4_unicode_ci = ${maternalGrandmotherGotra.code}`
    )

    .where(and(...conditions))
    .orderBy(desc(users.id))
    .limit(limit)
    .offset(offset);
}

async function attachUserRelations(
  data: any[]
) {
  const userIds =
    data.map((u) => u.id);

  if (!userIds.length)
    return [];

  const siblingOccupation =
    alias(
      masterOccupation,
      "siblingOccupation"
    );

  const otherGotraMaster =
    alias(
      masterGotra,
      "otherGotraMaster"
    );

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

        user_id:
          siblingDetails.user_id,

        relation:
          siblingDetails.relation,

        name:
          siblingDetails.name,

        education:
          siblingDetails.education,

        occupation:
          siblingOccupation.name,
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
        id:
          otherGotras.id,

        user_id:
          otherGotras.user_id,

        other_gotra_relation:
          otherGotras.other_gotra_relation,

        other_gotra_name:
          otherGotraMaster.name,
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

  const addressMap =
    new Map();

  const siblingMap =
    new Map();

  const otherGotraMap =
    new Map();

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
    (user) => ({
      ...user,

      address_details:
        addressMap.get(
          user.id
        ) || [],

      sibling_details:
        siblingMap.get(
          user.id
        ) || [],

      other_gotra:
        otherGotraMap.get(
          user.id
        ) || [],
    })
  );
}

export async function getUsers(
  params: GetUsersProps
) {
  const {
    page = 1,
    limit = 10,
  } = params;

  // console.log("profile default ", params)

  const conditions = [
    eq(users.isSuspended, false),
  ];

  // filters add here...

  const data =
    await getBaseUsers(
      conditions,
      page,
      limit
    );

  const finalData =
    await attachUserRelations(
      data
    );

  const [totalResult] =
    await db
      .select({
        count:
          sql<number>`count(*)`,
      })
      .from(users)
      .where(
        and(...conditions)
      );

  const total =
    Number(totalResult.count);

  return {
    data: finalData,

    pagination: {
      total,
      page,
      limit,
      totalPages:
        Math.ceil(
          total / limit
        ),
    },
  };
}

export async function getProfileMatches(
  params: GetMatchedUsersProps
) {
  const {
    page = 1,
    limit = 10,

    looking_for,
    preferredAge,
    req_occupation,
    exclude_gotra,
  } = params;

  const conditions = [
    eq(users.isSuspended, false),
  ];

  /**
   * OCCUPATION
   */
  if (
    req_occupation &&
    req_occupation.length > 0
  ) {
    conditions.push(
      inArray(
        users.occupation,
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
        users.gender,
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
        users.self_gotra,
        exclude_gotra
      )
    );

    conditions.push(
      notInArray(
        users.m_gotra,
        exclude_gotra
      )
    );

    conditions.push(
      notInArray(
        users.gm_gotra,
        exclude_gotra
      )
    );

    conditions.push(
      notInArray(
        users.mat_gm_gotra,
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
    const [minAge, maxAge] =
      preferredAge;

    const today =
      new Date();

    const maxDob =
      new Date();

    maxDob.setFullYear(
      today.getFullYear() -
      minAge
    );

    const minDob =
      new Date();

    minDob.setFullYear(
      today.getFullYear() -
      (maxAge - 1)
    );

    conditions.push(
      gte(
        users.dob,
        minDob
      )
    );

    conditions.push(
      lte(
        users.dob,
        maxDob
      )
    );
  }

  console.log(
    "profile match params",
    params
  );

  console.log(
    "conditions count",
    conditions.length
  );

  const data =
    await getBaseUsers(
      conditions,
      page,
      limit
    );

  const finalData =
    await attachUserRelations(
      data
    );

  const [totalResult] =
    await db
      .select({
        count:
          sql<number>`count(*)`,
      })
      .from(users)
      .where(
        and(...conditions)
      );

  const total =
    Number(totalResult.count);

  return {
    data: finalData,

    pagination: {
      total,
      page,
      limit,
      totalPages:
        Math.ceil(
          total / limit
        ),
    },
  };
}

export async function createUser(
  payload: CreateUserInput
) {

  return await db.transaction(
    async (tx) => {

      /**
       * USER
       */
      const [userResult] =
        await tx
          .insert(users)
          .values({
            // other_mobile:
            //   payload.other_mobile,

            mobile:
              payload.gender,

            gender:
              payload.gender,

            name:
              payload.name,

            dob:
              payload.dob,

            education:
              payload.education,

            occupation:
              payload.occupation,

            fathersname:
              payload.fathersname,

            mothersname:
              payload.mothersname,

            fathersoccupation:
              payload.fathersoccupation,

            mothersoccupation:
              payload.mothersoccupation,

            self_gotra:
              payload.self_gotra,

            m_gotra:
              payload.m_gotra,

            gm_gotra:
              payload.gm_gotra,

            mat_gm_gotra:
              payload.mat_gm_gotra,

            preferences:
              payload.preferences,

            otherinfo:
              payload.other_details,
          })
          .$returningId();

      const userId =
        userResult.id;



      /**
       * ADDRESS
       */
      if (
        payload.address_details
          ?.length
      ) {

        await tx
          .insert(addresses)
          .values(
            payload.address_details.map(
              (item) => ({
                user_id:
                  userId,

                address:
                  item.full_address,

                state:
                  item.state,

                city:
                  item.city,

                pincode:
                  item.pincode,

                type:
                  item.type,
              })
            )
          );
      }

      /**
       * SIBLINGS
       */
      if (
        payload.sibling_details
          ?.length
      ) {

        await tx
          .insert(siblingDetails)
          .values(
            payload.sibling_details.map(
              (item) => ({
                user_id:
                  userId,

                relation:
                  item.relation,

                name:
                  item.sibling_name,

                education:
                  item.sibling_education,

                occupation:
                  item.sibling_occupation,
              })
            )
          );
      }

      /**
       * OTHER GOTRA
       */
      if (
        payload.other_gotra
          ?.length
      ) {

        await tx
          .insert(otherGotras)
          .values(
            payload.other_gotra.map(
              (item) => ({
                user_id:
                  userId,

                other_gotra_relation:
                  item.other_gotra_relation,

                other_gotra_name:
                  item.other_gotra_name,
              })
            )
          );
      }

      return userResult;
    }
  );
}

export async function getUserById(
  id: number
) {

  // return await db.query.users
  //   .findFirst({
  //     where: eq(users.id, id),
  //   });

  const [user] = await db.select({
    id: users.id,
    mobile: users.mobile,
    gender: users.gender,
    name: users.name,
    dob: users.dob,
    education: users.education,

    fathersname: users.fathersname,
    mothersname: users.mothersname,
    fathersoccupation: users.fathersoccupation,
    mothersoccupation: users.mothersoccupation,

    preferences: users.preferences,
    otherinfo: users.otherinfo,

    occupationFull: masterOccupation,
    occupation: masterOccupation.name,

    self_gotra: selfGotra.name,
    m_gotra: motherGotra.name,
    gm_gotra: grandmotherGotra.name,
    mat_gm_gotra:
      maternalGrandmotherGotra.name,
  })
    .from(users)

    .leftJoin(
      masterOccupation,
      sql`${users.occupation} COLLATE utf8mb4_unicode_ci = ${masterOccupation.code}`
    )

    .leftJoin(
      selfGotra,
      sql`${users.self_gotra} COLLATE utf8mb4_unicode_ci = ${selfGotra.code}`
    )

    .leftJoin(
      motherGotra,
      sql`${users.m_gotra} COLLATE utf8mb4_unicode_ci = ${motherGotra.code}`
    )

    .leftJoin(
      grandmotherGotra,
      sql`${users.gm_gotra} COLLATE utf8mb4_unicode_ci = ${grandmotherGotra.code}`
    )

    .leftJoin(
      maternalGrandmotherGotra,
      sql`${users.mat_gm_gotra} COLLATE utf8mb4_unicode_ci = ${maternalGrandmotherGotra.code}`
    )

    .where(eq(users.id, id))
    .limit(1);
  // .then(rows => rows[0] ?? null);

  return user;
}

export async function updateUser(
  userId: number,
  payload: UpdateUserInput
) {
  return await db.transaction(async (tx) => {

    /**
     * USER
     */
    await tx
      .update(users)
      .set({
        mobile: payload.mobile,
        gender: payload.gender,
        name: payload.name,
        dob: payload.dob,
        education: payload.education,
        occupation: payload.occupation,
        fathersname: payload.fathersname,
        mothersname: payload.mothersname,
        fathersoccupation: payload.fathersoccupation,
        mothersoccupation: payload.mothersoccupation,
        self_gotra: payload.self_gotra,
        m_gotra: payload.m_gotra,
        gm_gotra: payload.gm_gotra,
        mat_gm_gotra: payload.mat_gm_gotra,
        preferences: payload.preferences,
        otherinfo: payload.other_details,
      })
      .where(eq(users.id, userId));

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

export async function suspendUser(
  id: number
) {

  await db
    .update(users)
    .set({
      isSuspended: true,
    })
    .where(
      eq(users.id, id)
    );

  return true;
}
export async function activeUser(
  id: number
) {

  await db
    .update(users)
    .set({
      isSuspended: false,
    })
    .where(
      eq(users.id, id)
    );

  return true;
}


export async function getUserByMobile(
  mobile: string
) {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      mobile: users.mobile,
      gender: users.gender,
      dob: users.dob,
      occupation: masterOccupation.name,
    })
    .from(users)
    .leftJoin(
      masterOccupation,
      sql`${users.occupation} COLLATE utf8mb4_unicode_ci = ${masterOccupation.code}`
    )
    .where(
      and(
        eq(users.mobile, mobile),
        eq(users.isSuspended, false)
      )
    );

  return data;
}