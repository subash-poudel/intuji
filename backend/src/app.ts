import express from "express";
import { appConfig } from "./helpers/config";
import knex from "./db";

const app = express();
const port = appConfig.port;

app.get("/", async (req, res) => {
  const result = await knex.raw(`SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';`);
  console.log("got the sum", result.rows);
  res.send("Hello, World! 2");
});

app.listen(port, () => {
  console.log(`Server listening   
 on port ${port}`);
});
