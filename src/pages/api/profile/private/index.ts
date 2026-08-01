import type {
  NextApiRequest,
  NextApiResponse,
} from "next";

import { ZodError } from "zod";

import {
  createBulkProfiles,
  createProfile,
  getProfileMatches,
  getProfiles,
} from "@/lib/modules/profile/profile.service";

import { verifyAccessToken } from "@/lib/modules/admin/admin.service";
import { ROLE_TYPES } from "@/lib/modules/admin/admin.types";
import {
  createProfileSchema,
} from "@/lib/modules/profile/profile.validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {

    // 🔐 Get authenticated user
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }
    // console.log("+++++++++++++", authHeader)

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header",
      });
    }

    const decoded = verifyAccessToken(token);

    // console.log("*********", token)

    const { role, mobile }: any = decoded;

    // console.log({ role, mobile })

    /**
     * CREATE PROFILE
     */
    if (req.method === "POST") {

      const action = req.query.action as string;


      /**
       * BULK CREATE / UPLOAD
       */
      if (action === "bulkCreate") {


        if (!Array.isArray(req.body)) {
          return res.status(400).json({
            success: false,
            message: "Payload must be an array",
          });
        }


        /**
         * Validate all profiles
         */
        const validatedProfiles =
          req.body.map((item: any) =>
            createProfileSchema.parse(item)
          );


        const result =
          await createBulkProfiles(
            validatedProfiles
          );


        return res.status(201).json({
          success: true,
          count: result.length,
          data: result,
        });
      }



      /**
       * SINGLE CREATE
       */

      const validatedData = createProfileSchema.parse(req.body);
      const result = await createProfile(validatedData);

      return res.status(201).json({ success: true, data: result });
    }




    /**
     * ALL PROFILES LIST
     */

    if (req.method === "GET") {

      const action = req.query.action as string;

      const page = Number(req.query.page || 1);

      const limit = Number(req.query.limit || 10);

      const looking_for = req.query.looking_for as string;

      const preferredAgeRaw =
        req.query.preferredAge ??
        req.query["preferredAge[]"];

      let preferredAge: | [number, number] | undefined;

      if (Array.isArray(preferredAgeRaw)) {

        const ages = preferredAgeRaw.map(Number);

        if (ages.length === 2) {
          preferredAge = [
            ages[0],
            ages[1],
          ];
        }
      }

      const reqOccupationRaw =
        req.query.req_occupation ??
        req.query["req_occupation[]"];

      const req_occupation =
        Array.isArray(reqOccupationRaw)
          ? reqOccupationRaw
          : reqOccupationRaw
            ? [reqOccupationRaw]
            : [];;

      const excludeGotraRaw =
        req.query.exclude_gotra ??
        req.query["exclude_gotra[]"];

      const exclude_gotra =
        Array.isArray(excludeGotraRaw)
          ? excludeGotraRaw
          : excludeGotraRaw
            ? [excludeGotraRaw]
            : [];

      const occupation = req.query.occupation as string;
      const gender = req.query.gender as string;
      const min_age = Number(req.query.min_age);
      const max_age = Number(req.query.max_age);
      const self_gotra = req.query.self_gotra as string;
      const m_gotra = req.query.m_gotra as string;
      const gm_gotra = req.query.gm_gotra as string;
      const mat_gm_gotra = req.query.mat_gm_gotra as string;

      if (action === "matches") {
        // FOR PUBLIC ROUTE AFTHER MAIN SEARECH 
        const result =
          await getProfileMatches({
            page,
            limit,
            looking_for,
            preferredAge,
            req_occupation,
            exclude_gotra,
          });

        return res.status(200).json({
          success: true,
          ...result,
        });
      } else {


        const result = await getProfiles({
          page,
          limit,
          occupation,
          gender,
          role: role as ROLE_TYPES,
          mobile,

          min_age,
          max_age,

          self_gotra,
          m_gotra,
          gm_gotra,
          mat_gm_gotra,
        });


        return res.status(200).json({
          success: true,
          ...result,
        });
      }


    }

    return res.status(405).json({
      success: false,
      message:
        "Method not allowed",
    });

  } catch (error: any) {

    // console.log(error);

    /**
     * Zod Error
     */
    if (
      error instanceof ZodError
    ) {

      return res.status(400).json({
        success: false,
        errors:
          error.flatten(),
      });
    }

    /**
     * Duplicate Entry
     */
    if (error?.cause?.code === "ER_DUP_ENTRY") {

      return res.status(409).json({
        success: false,
        message:
          "Mobile number already exists",
      });
    }

    /**
     * MySQL Error
     */
    if (
      error?.cause?.sqlMessage
    ) {

      return res.status(400).json({
        success: false,
        message:
          error.cause.sqlMessage,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
}