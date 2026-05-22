import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ideavault-backend-1.onrender.com/api/auth",
  
  fetchOptions: {
    authPlugins: [
      {
        id: "local-storage-token",
        onRequest: async (request) => {
          const token = localStorage.getItem("better-auth.session_token");
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
          return request;
        },
        onResponse: async (response) => {
          const token = response.headers.get("X-Session-Token");
          if (token) {
            localStorage.setItem("better-auth.session_token", token);
          }
          return response;
        }
      }
    ]
  }
});