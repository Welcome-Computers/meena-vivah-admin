import { ForbiddenError, UnauthorizedError } from "@lib/errors/http.errors";
import type { NextApiResponse } from "next";
import { ZodError } from "zod";

export const handleApiError = (
  res: NextApiResponse,
  error: any
) => {

  /**
   * Unauthorized / Authentication Error
   */
  if (error instanceof UnauthorizedError) {
    console.log(`Auth: ${error.message}`);

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  /**
   * Forbidden / Authorization Error
  */
  if (error instanceof ForbiddenError) {
    console.log(`Forbidden: ${error.message}`);

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error("+++ API Error +++ :", error);

  /**
   * Zod Validation Error
   */
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: error.flatten(),
    });
  }

  /**
   * Duplicate Entry
   */
  if (error?.cause?.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry",
    });
  }

  /**
   * MySQL Error
   */
  if (error?.cause?.sqlMessage) {
    return res.status(400).json({
      success: false,
      message: error.cause.sqlMessage,
    });
  }

  /**
   * Unknown Error
   */
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};