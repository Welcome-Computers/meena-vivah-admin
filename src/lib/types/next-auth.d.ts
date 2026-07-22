
import "next-auth";
import { DefaultUser } from "next-auth";

interface MyUser {
  id: number;
  first_name: string;
  second_name: string;
  last_name: string;
  email: string;
  mobile: string;
  profile_pick: string;
  dob: string;
  gender: string;
  role: string;
  role_id: number;
  is_verified: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  line_1: string;
  city: string;
  state: string;
  district: string;
  zip_code: string;
  password: string | null;
}

declare module "next-auth" {
  interface User extends DefaultUser, MyUser {
    // after succefull login we will put this from next-auth;
    access_token?: string;
    refresh_token?: string;
    // expires_in?: number;
    access_token_expires?: number;
  }

  interface Session {
    user: User;
    access_token?: string;
    refresh_token?: string;
    access_token_expires?: number;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: MyUser;
    access_token?: string;
    refresh_token?: string;
    // expires_in?: number;
    access_token_expires?: number;
  }
}

