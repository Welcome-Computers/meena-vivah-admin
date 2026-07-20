import axios from "axios";
import { getSession, signOut } from "next-auth/react";

// ✅ Create Axios instance with base URL and credentials
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// ✅ Request interceptor: Attach access token from session before each request
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
      // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaGFyc2hpdEBleGFtcGxlLmNvbSIsIm1vYmlsZSI6Ijk4NzY1NDMyMTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTc1NTMxNzkwMCwiZXhwIjoxNzU1MzE3OTYwfQ.3rwbj3eB11GfFRaBnFUJQXYh4FxOtvnacc6HuOp-mYg`;
    }

    return config;
  },
  (error) => {
    // ❌ Request setup failed — forward the error
    return Promise.reject(error);
  }
);

// ✅ Response interceptor: Handle 401 errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message;

    // 🚫 Check if refresh token is invalid or expired
    const isRefreshTokenExpired =
      message?.includes("Refresh token not found") ||
      message?.includes("Token is blacklisted") ||
      message?.includes("Refresh token expired");

    // ⛔ Logout and redirect to signin if refresh token is expired
    if (status === 401 && isRefreshTokenExpired) {
      await signOut({
        redirect: true,
        callbackUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}/signin`
            : "/signin",
      });

      // return Promise.reject(error);
      // Prevent any error from reaching component
      return new Promise(() => { }); // safely stop everything
    }
    
    // 🔁 Retry the original request once if access token was missing or expired
    // messagee?.includes("Access_token is blacklisted")
    
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const session = await getSession();
      if (session?.access_token) {
        originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
        return api(originalRequest); // Retry original request with new token
      }
    } 
    
    if (status === 401 && originalRequest._retry) {
      await signOut({
        redirect: true,
        callbackUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}/signin`
            : "/signin",
      });
    }

    // ❌ Forward all other errors
    // return Promise.reject(error);
  }
);

// ✅ Export the customized Axios instance
export default api;
