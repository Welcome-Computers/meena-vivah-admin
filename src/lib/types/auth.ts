import { User } from "next-auth";

export interface LoginApiResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        access_token: string;
        refresh_token?: string;
        expires_in?: number;
    };
}
export interface RegisterApiResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
    };
}
