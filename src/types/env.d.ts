export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_TOKEN: string;
      // SUPABASE_PROJECT_URL: string;
      // ENV: "test" | "dev" | "prod";
    }
  }
}
