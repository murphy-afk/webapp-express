import express from "express";
import movieController from "../controller/movieController.js";

const router = express.Router();

router.get("/", movieController.index);
router.get("/:id", movieController.show);
export default router;