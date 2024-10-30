import { Knex } from "knex";
import { appConfig } from "./src/helpers/config";

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: appConfig.dbHost,
      port: appConfig.dbPort,
      user: appConfig.postgresUser,
      password: appConfig.postgresPassword,
      database: appConfig.postgresDatabaseName,
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
};

export default knexConfig;
