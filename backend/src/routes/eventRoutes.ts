import { Router } from "express";

import * as eventController from "../controllers/eventController";

const router = Router();

router.get("/", eventController.fetchAll);

export default router;
