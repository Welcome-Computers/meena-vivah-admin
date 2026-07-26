import { getSession } from "next-auth/react";

export const prepareAuthHeaders = async (
  headers: Headers
) => {
  const session = await getSession();

  const token = session?.access_token;

  if (token) {
    headers.set(
      "authorization",
      `Bearer ${token}`
    );
  }

  return headers;
};