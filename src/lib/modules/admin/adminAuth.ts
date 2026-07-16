
// import jwt from "jsonwebtoken";

// export const adminAuth = (req: any) => {
//   const token = req.cookies.accessToken;

//  if (!token) {
//     throw new Error("Unauthorized. Please login as admin.");
//   }

//   try {
//     return jwt.verify(token, process.env.JWT_SECRET_TOKEN!);
//   } catch {
//     throw new Error("Session expired. Please login again.");
//   }
// };
  