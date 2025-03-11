import { PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import Image from "../models/Image.js";
import s3 from "../config/awsS3.js";
import { errorLog, log } from "../utils/logger.js";

export const uploadImage = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: "File upload failed" });

  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    const image = new Image({
      filename: req.file.originalname,
      url: imageUrl,
      uploadDate: new Date(),
    });

    await image.save();

    log(`Image uploaded: ${imageUrl}`);
    res.json({ message: "Image uploaded successfully", data: image });
  } catch (error) {
    errorLog(error.message);
    next(error);
  }
};

export const getImages = async (req, res, next) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    errorLog(error.message);
    next(error);
  }
};

// Get images from S3 bucket
export const getS3Images = async (req, res, next) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
    });

    const { Contents } = await s3.send(command);

    if (!Contents || Contents.length === 0) {
      return res.json({ message: "No images found in S3" });
    }

    const images = Contents.map((item) => ({
      filename: item.Key,
      url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
    }));

    log("Fetched images from S3");
    res.json(images);
  } catch (error) {
    errorLog(error.message);
    next(error);
  }
};
