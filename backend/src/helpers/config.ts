import dotenv from "dotenv";

dotenv.config();

export interface EnvConfig {
  port: number;
  env: string;
  databaseUrl: string;
}

export const appConfig: EnvConfig = {
  port: parseInt(process.env.PORT || "4000"),
  env: process.env.NODE_ENV ?? "dev",
  databaseUrl: process.env.DATABASE_URL ?? "",
};
