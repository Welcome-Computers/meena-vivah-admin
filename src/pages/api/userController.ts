import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PersonalDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const connection = await db.getConnection();
  try {
    const { name, dob, education, occupation, gender, f_occupation, f_name, m_name, m_occupation, sibling_details, address_details, other_gotra, gotra_self, gotra_mother, gotra_grandmother, gotra_grandmother_maternal, preferences, mobile_details, other_details, type,
    } = req.body;

    const mobile = mobile_details[0]?.mobile;
    await connection.beginTransaction();

    // person table query
    const [result]: any = await connection.query(
      `INSERT INTO user (mobile,gender,name,dob,education,occupation,fathersname,mothersname,fathersoccupation,mothersoccupation,self_gotra,m_gotra,gm_gotra,mat_gm_gotra,preferences,otherinfo
     ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [ mobile, gender, name, dob, education, occupation, f_name, m_name, f_occupation, m_occupation, gotra_self, gotra_mother, gotra_grandmother, gotra_grandmother_maternal, preferences, other_details,
      ],
    );

    // extract current user id
    const id = result.insertId;

    // sibling details query
    if (sibling_details && sibling_details.length > 0) {
      for (let details of sibling_details) {
        const { relation, sibling_name, sibling_occupation, sibling_education,
        } = details;

        const sibling_relation = relation;
        await connection.query(
          `INSERT INTO sibling_details(user_id,relation,name,education,occupation) VALUES(?,?,?,?,?)`,
          [ id, sibling_relation, sibling_name, sibling_occupation, sibling_education,
          ],
        );
      }
    }

    // address
    if (address_details && address_details.length > 0) {
      for (let details of address_details) {
        const { full_address, state, tehsil, city, pincode, type } = details;
        await connection.query(
          `INSERT INTO address(user_id,address,tehsil,state,city,pincode ,type) VALUES(?,?,?,?,?,?,?)`,
          [id, full_address, state, tehsil, city, pincode, type],
        );
      }
    }

    //  gotra details other
    if (other_gotra && other_gotra.length > 0) {
      for (let details of other_gotra) {
        const { other_gotra_relation, other_gotra_name } = details;
        await connection.query(
          `INSERT INTO other_gotra(user_id,other_gotra_relation,other_gotra_name) VALUES(?,?,?)`,
          [id, other_gotra_relation, other_gotra_name],
        );
      }
    }

    // mobile Details
    // if (mobile_details && mobile_details.length > 0) {
    //   for (let details of mobile_details) {
    //     const { mobile } = details;
    //     await connection.query(
    //       `INSERT INTO mobile(user_id,mobile) VALUES(?,?)`,
    //       [id, mobile],
    //     );
    //   }
    // }

    await connection.commit();

    return res.status(200).json({ message: "Success" });
  } catch (e) {
    console.log("ERROR ", e);
    await connection.rollback();
    return res.status(400).json({ message: "err" });
  }
}
