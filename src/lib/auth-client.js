import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ideavault-backend-1.onrender.com",

  fetchOptions: {
    credentials: "include"
  }
});