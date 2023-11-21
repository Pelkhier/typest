import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";

// This function for initializing Vercel analytics tools
inject({ mode: dev ? "development" : "production" });
