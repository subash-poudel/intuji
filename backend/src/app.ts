import express from "express";
import { appConfig } from "./helpers/config";

const app = express();
const port = appConfig.port;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server listening   
 on port ${port}`);
});
