import { desc, eq, sql } from "drizzle-orm";
import { otherGotras } from './../../db/schema/otherGotra';

import { db } from "@/lib/db";

import { users } from "@/lib/db/schema/user";

import { addresses } from "@/lib/db/schema/address";

import { siblingDetails } from "@/lib/db/schema/sibling";




import {
  CreateUserInput,
  UpdateUserInput,
} from "./user.validation";

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
            mobile:
              payload.mobile_details?.[0]
                ?.mobile,

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
              payload.father_name,

            mothersname:
              payload.mother_name,

            fathersoccupation:
              payload.father_occupation,

            mothersoccupation:
              payload.mother_occupation,

            self_gotra:
              payload.gotra_self,

            m_gotra:
              payload.gotra_mother,

            gm_gotra:
              payload.gotra_grandmother,

            mat_gm_gotra:
              payload.gotra_grandmother_maternal,

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

                tehsil:
                  item.tehsil,

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

type GetUsersProps = {
  page?: number;
  limit?: number;
};

export async function getUsers({
  page = 1,
  limit = 10,
}: GetUsersProps) {

  const offset =
    (page - 1) * limit;

  /**
   * USERS
   */
  const data =
    await db
      .select()
      .from(users)
      .where(
        eq(
          users.isSuspended,
          false
        )
      )
      .orderBy(
        desc(users.id)
      )
      .limit(limit)
      .offset(offset);

  /**
   * COMBINE RELATIONAL DATA
   */
  const finalData =
    await Promise.all(
      data.map(
        async (user) => {

          const userAddress =
            await db
              .select()
              .from(addresses)
              .where(
                eq(
                  addresses.user_id,
                  user.id
                )
              );

          const userSiblings =
            await db
              .select()
              .from(
                siblingDetails
              )
              .where(
                eq(
                  siblingDetails.user_id,
                  user.id
                )
              );

          const userOtherGotra =
            await db
              .select()
              .from(
                otherGotras
              )
              .where(
                eq(
                  otherGotras.user_id,
                  user.id
                )
              );

          return {
            ...user,

            address_details:
              userAddress,

            sibling_details:
              userSiblings,

            other_gotra:
              userOtherGotra,
          };
        }
      )
    );

  /**
   * TOTAL COUNT
   */
  const [totalResult] =
    await db
      .select({
        count:
          sql<number>`count(*)`,
      })
      .from(users)
      .where(
        eq(
          users.isSuspended,
          false
        )
      );

  const total =
    totalResult.count;

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

export async function getUserById(
  id: number
) {

  return await db.query.users
    .findFirst({
      where: eq(users.id, id),
    });
}

export async function updateUser(
  payload: UpdateUserInput
) {

  await db
    .update(users)
    .set({
      name:
        payload.name,

      education:
        payload.education,

      occupation:
        payload.occupation,
    })
    .where(
      eq(users.id, payload.id)
    );

  return true;
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