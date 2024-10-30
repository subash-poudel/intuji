import { Router } from "express";

import * as eventController from "../controllers/eventController";
import { eventValidator } from "../validators/eventValidator";

const router = Router();

router.get("/", eventController.fetchAll);
router.post("/", eventValidator, eventController.createEvent);

export default router;
