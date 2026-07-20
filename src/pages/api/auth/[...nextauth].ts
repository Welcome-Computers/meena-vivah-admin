// src\pages\api\auth\[...nextauth].tsx

// import { LoginApiResponse, RegisterApiResponse } from "@/types/auth";
// import { INACTIVITY_TIME } from "@/utils/constants";
import { INACTIVITY_TIME } from "@/lib/modules/admin/admin.types";
import { LoginApiResponse, RegisterApiResponse } from "@/lib/types/auth";
import type { NextAuthOptions, User } from "next-auth";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// ✅ API base URL for authentication endpoints
const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// ✅ Custom fetch helper to POST login/refresh requests
const fetchAPI = async (url: string, data: any, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),

      ...options,
    });

    if (!response.ok) {
      const errorData = await response?.json();
      return Promise.reject(new Error(errorData?.message || "API request failed"));
    }

    return await response.json();
  } catch (error: any) {
    console.error("fetchAPI Error :", error);
    return Promise.reject(new Error(error.message || "Network error. Please try again."));
  }
};

export const authenticatedFetch = async (
  url: string,
  accessToken: string,
  data?: any
) => {
  return fetchAPI(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      credentials: "include"
    },
  });
};

// ✅ Helper to store access and refresh tokens inside JWT
const setTokens = (token: any, newData: any) => {
  const { expires_in, access_token, refresh_token } = newData || {};

  // Set access token expiration (in ms)
  const access_token_expires = expires_in
    ? Date.now() + expires_in * 60 * 1000
    : Date.now() + INACTIVITY_TIME * 60 * 1000;

  token.access_token = access_token;
  token.refresh_token = refresh_token;
  token.access_token_expires = access_token_expires;

  return token;
};

// ✅ NextAuth configuration object
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,

  providers: [
    // Registration Provider
    CredentialsProvider({
      id: "sign_up",
      name: "User Registration",
      credentials: {
        first_name: { label: "First Name", type: "text" },
        second_name: { label: "Second Name", type: "text" },
        email: { label: "Email", type: "text" },
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const requestBody = {
            userInfo: {
              first_name: credentials?.first_name,
              second_name: credentials?.second_name,
              email: credentials?.email,
              mobile: credentials?.mobile,
              password: credentials?.password,
              role: credentials?.role,
            }
          };

          const response: RegisterApiResponse = await fetchAPI("/auth/register", requestBody);

          if (!response || !response?.success || !response?.data) {
            console.error("User registration failed:", response?.message || "Unknown error");
            return Promise.reject(new Error(response?.message || "Registration failed"));
          }

          return {
            id: "success-only",
            status: "registered",
          } as any;

        } catch (error: any) {
          console.error("API Error:", error.message);
          return Promise.reject(new Error(error.message || "Something went wrong during registration"));
        }
      },
    }),

    // 🔐 Credentials-based login (mobile + password)
    CredentialsProvider({
      id: "sign_in",
      name: "Mobile & Password",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const requestBody = {
            mobile: credentials?.mobile,
            password: credentials?.password,
          };
          // 🔐 Call backend login API
          const response: LoginApiResponse = await fetchAPI("/auth/login/next_login", requestBody);

          // console.log("####", response)

          if (!response?.success) throw new Error(response?.message || "Login failed");

          // ❌ Reject deleted users
          if (response?.data?.user?.is_deleted) {
            throw new Error(`is_delete_user:${response?.message}`);
          }

          const user = response.data?.user || null;

          if (!user) return null;

          // ✅ Attach access/refresh token to user object
          return {
            ...user,
            access_token: response?.data?.access_token,
            refresh_token: response?.data?.refresh_token,
            expires_in: response?.data?.expires_in,
          } as User;

        } catch (error: any) {
          throw new Error(error.message || "Something went wrong during login");
        }
      },
    }),
  ],

  // 🔁 Custom pages
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/auth/error",
  },

  // 🔄 Custom token/session/redirect handling
  callbacks: {
    // ✅ Handle JWT logic (token creation + refresh)
    async jwt({ token, user }: { token: JWT; user?: User }) {
      // First time login: set token info from user

      if (user) {
        const updatedToken = setTokens(token, user);
        const { access_token, refresh_token, expires_in, ...restUser } = user || {};
        updatedToken.user = restUser;
        return updatedToken;
      }

      // Subsequent request: check for expired token
      const isTokenExpired = Date.now() > (token.access_token_expires ?? 0);

      if (!isTokenExpired) return token;

      // ⏳ Access token expired — try to refresh
      try {
        console.log('++++++++++ USED REFRESH TOKEN +++++++++++++');

        const refreshResponse = await fetch(`${API_ENDPOINT}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

        const data = await refreshResponse.json();

        const { access_token } = data?.data || {};

        if (!refreshResponse.ok || !access_token) {
          throw new Error("Refresh failed");
        }

        return setTokens(token, data?.data);

      } catch (error) {
        // ❌ Refresh token expired or invalid
        token.error = "RefreshTokenError";
        return token;
      }
    },

    // ✅ Customize session returned to frontend
    async session({ session, token }: { session: Session; token: JWT | any }) {
      try {
        const { access_token, refresh_token, access_token_expires, user, error } = token || {};

        if (!access_token) {
          return {
            ...session,
            error: "Refresh token expired",
          };
        }

        return {
          ...session,
          access_token,
          refresh_token,
          access_token_expires,
          user,
          error: error ?? null,
        };

      } catch (error: any) {
        console.error("Session Callback Error:", error);
        return {
          ...session,
          error: "An error occurred while retrieving the session.",
        };
      }
    },

    // ✅ Control redirection after sign-in / sign-out / error
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }): Promise<string> {
      const correctedBaseUrl = process.env.NEXTAUTH_URL || "http://localhost:4411";

      try {
        const fullUrl = new URL(url, correctedBaseUrl);

        // 🛑 Prevent redirect loops on error
        if (fullUrl.searchParams.has("error")) {
          return baseUrl;
        }

        // 🛡️ Prevent open redirect attacks
        if (fullUrl.origin !== new URL(baseUrl).origin) {
          return `${baseUrl}/`;
        }

        // ⏩ Redirect "/" to /signin
        if (fullUrl.pathname === "/") {
          return `${baseUrl}/signin`;
        }

        return fullUrl.href;
      } catch (error) {
        console.error("Redirect Callback Error:", error);
        return `${baseUrl}/`;
      }
    },
  },

  // 🐞 Enable debug logging in development
  debug: true,

  events: {
    async signOut({ token }) {
      // console.log("++++", token)
      if (!token?.access_token) {
        return;
      }
      // console.log("####")
      try {
        await authenticatedFetch("/auth/logout", token?.access_token);
      } catch (err) {
        console.error(err);
      }
    },
  },
};

export default NextAuth(authOptions);
