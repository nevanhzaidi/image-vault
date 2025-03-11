import express from "express";
import upload from "../config/multer.js";
import { uploadImage, getImages, getS3Images } from "../controllers/imageController.js";

const router = express.Router();

router.get("/images", getImages);
router.get("/s3-images", getS3Images);
router.post("/upload", upload.single("image"), uploadImage);

export default router;
