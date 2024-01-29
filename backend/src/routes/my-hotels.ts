import express, {Request, Response} from 'express';
import multer from "multer"
import cloudinary from "cloudinary"
import { HotelType } from '../models/hotel';
import { body } from "express-validator";
import Hotel from "../models/hotel";

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB

  }
})

// api/my-hotels
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]
      const newHotel: HotelType = req.body

      const uploadPromises = imageFiles.map(async(image) => {
        const b64 = Buffer.from(image.buffer).toString("base64")
        let dataURL = "data:" + image.mimetype + ";base64," + b64
        const response = await cloudinary.v2.uploader.upload(dataURL)
        return response.url
      })

      const imageUrls = await Promise.all(uploadPromises)
      newHotel.imageUrls = imageUrls
      newHotel.lastUpdated = new Date()
      newHotel.userId = newHotel.userId

      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(201).send(hotel);
    } catch(e) {
      res.status(500).json({message: "Something went wrong"})
    }
})

export default router;