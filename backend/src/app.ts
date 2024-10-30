import express from "express";
import { appConfig } from "./helpers/config";
import cors from "cors";
import bodyParser from "body-parser";
import * as errorHandler from "./middlewares/errorHandler";

import eventsRouter from "./routes/eventRoutes";

const app = express();
// Enable CORS
app.use(cors());

// Parse application/json
app.use(bodyParser.json()); //

const port = appConfig.port;

app.get("/", async (req, res) => {
  res.send("Hello, World! 2");
});

app.use("/events", eventsRouter);
app.use(errorHandler.bodyParser);
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(port, () => {
  console.log(`Server listening   
 on port ${port}`);
});
