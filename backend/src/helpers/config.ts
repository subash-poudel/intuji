import dotenv from "dotenv";

dotenv.config();

export interface EnvConfig {
  port: number;
  env: string;
  dbHost: string;
  dbPort: number;
  databaseUrl: string;
  postgresUser: string;
  postgresPassword: string;
  postgresDatabaseName: string;
}

export const appConfig: EnvConfig = {
  port: parseInt(process.env.PORT || "4000"),
  env: process.env.NODE_ENV ?? "dev",
  dbHost: process.env.DB_HOST ?? "",
  dbPort: Number(process.env.DB_PORT),
  databaseUrl: process.env.DATABASE_URL ?? "",
  postgresUser: process.env.POSTGRES_USER ?? "",
  postgresPassword: process.env.POSTGRES_PASSWORD ?? "",
  postgresDatabaseName: process.env.POSTGRES_DB ?? "",
};
