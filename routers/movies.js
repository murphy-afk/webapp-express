import express from "express";
import movieController from "../controller/movieController.js";
import upload from "../middlewares/handleFile.js";

const router = express.Router();

router.get("/", movieController.index);
router.get("/:id", movieController.show);
router.post("/", upload.single("image"), movieController.storeMovie);
router.post('/:id/reviews', movieController.storeReview)
export default router;