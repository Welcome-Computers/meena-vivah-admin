import { NextApiResponse } from "next";


export const apiErrorHandler = (error: any, res: NextApiResponse) => {


  if (error?.message?.includes("already exists")) {
          return res.status(409).json({
            success: false,
            message: error.message,
          });
        }


        if (error?.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            success: false,
            message: "Gotra already exists.",
            error: error.sqlMessage,
          });
        }


         if (error?.message === "Unauthorized. Please login as admin." ||  error.message === "Session expired. Please login again.") {
          return res.status(401).json({
            success: false,
            message: error.message,
          });
        } 

        
        return res.status(500).json({
          success: false,
          message: "Something went wrong.",
          error: error.message,
        });

}