import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function PersonalDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const connection = await db.getConnection();
  try {
    const {
      name,
      dob,
      education,
      occupation,
      gender,
      f_occupation,
      f_name,
      m_name,
      m_occupation,
      sibling_details,
      address_details,
      other_gotra,
      gotra_self,
      gotra_mother,
      gotra_grandmother,
      gotra_grandmother_maternal,
      preferences,
      mobile_details,
      other_details,
    } = req.body;

    const genderdetails = gender?.option;
    const mobile = mobile_details[0]?.mobile;

    await connection.beginTransaction();

    const [result]: any = await connection.query(
      `INSERT INTO personal (mobile,gender,name,dob,education,occupation) VALUES(?,?,?,?,?,?)`,
      [mobile, genderdetails, name, dob, education, occupation],
    );

    const id = result.insertId;
    // family details query
    await connection.query(
      `INSERT INTO family (person_id,f_name,m_name,f_occupation,m_occupation) VALUES(?,?,?,?,?)`,
      [id, f_name, m_name, f_occupation, m_occupation],
    );

    // // sibling query
    if (sibling_details && sibling_details.length > 0) {
      for (let details of sibling_details) {
        const {
          relation,
          sibling_name,
          sibling_occupation,
          sibling_education,
        } = details;
        const sibling_relation = relation?.option;
        await connection.query(
          `INSERT INTO sibling(user_id,relation,sibling_name,sibling_occupation,sibling_education) VALUES(?,?,?,?,?)`,
          [
            id,
            sibling_relation,
            sibling_name,
            sibling_occupation,
            sibling_education,
          ],
        );
      }
    }

    // address
    if (address_details && address_details.length > 0) {
      for (let details of address_details) {
        const { full_address, state, tehsil, city, pincode } = details;
        await connection.query(
          `INSERT INTO address(user_id,full_address,state,tehsil,city,pincode) VALUES(?,?,?,?,?,?)`,
          [id, full_address, state, tehsil, city, pincode],
        );
      }
    }

    // gotra details query
    await connection.query(
      `INSERT INTO gotra (user_id,gotra_self,gotra_mother,gotra_grandmother,gotra_grandmother_maternal) VALUES(?,?,?,?,?)`,
      [
        id,
        gotra_self,
        gotra_mother,
        gotra_grandmother,
        gotra_grandmother_maternal,
      ],
    );

    if (other_gotra && other_gotra.length > 0) {
      for (let details of other_gotra) {
        const { other_gotra_relation, other_gotra_name } = details;
        await connection.query(
          `INSERT INTO other_gotra(user_id,other_gotra_relation,other_gotra_name) VALUES(?,?,?)`,
          [id, other_gotra_relation, other_gotra_name],
        );
      }
    }

    // preferences and mobile Details
    await connection.query(
      `INSERT INTO preferences(user_id,preferences) VALUES(?,?)`,
      [id, preferences],
    );

    if (mobile_details && mobile_details.length > 0) {
      for (let details of mobile_details) {
        const { mobile } = details;
        await connection.query(
          `INSERT INTO mobile(user_id,mobile) VALUES(?,?)`,
          [id, mobile],
        );
      }
    }

    // Other Details
    await connection.query(
      `INSERT INTO other_details(user_id,other_details) VALUES(?,?)`,
      [id, other_details],
    );

    await connection.commit();

    return res.status(200).json({ message: "Success" });
  } catch (e) {
    console.log("ERROR ", e);
    await connection.rollback();
    return res.status(400).json({ message: "err" });
  }
}
