// hooks/useAuth.ts
import { ROLE_TYPES } from "@/lib/modules/admin/admin.types";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export const useAuth = () => {
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState(session?.access_token ?? null);
    // ✅ Refresh access token on mount
    useEffect(() => {
        const loadToken = async () => {
            const freshSession = await getSession();
            setAccessToken(freshSession?.access_token ?? null);
        };

        loadToken();
    }, []);

    const isAuthenticated = status === "authenticated";

    // ✅ Safe user name generation
    const userName = useMemo(() => {
        if (!isAuthenticated) return "";
        const name = session?.user?.name ?? "";
        // const first = session?.user?.first_name ?? "";
        // const second = session?.user?.second_name ?? "";
        // return [first, second].filter(Boolean).join(" ");
        return name;
    }, [isAuthenticated, session]);

    const profilePick = useMemo(() => {
        if (!isAuthenticated) return null;
        return session?.user?.profile_pick ?? "/profile-1.jpg";
    }, [isAuthenticated, session]);

    const userRole: ROLE_TYPES | null = useMemo(() => {
        if (!isAuthenticated) return null;

        return (session?.user?.role as ROLE_TYPES) ?? null;
    }, [isAuthenticated, session]);

    return {
        user: session?.user || null,
        accessToken,
        status,
        isAuthenticated,
        userName,
        profilePick,
        userRole,
    };
};
