import express from "express";
const router = express.Router();
import bookingController from "../controllers/booking.controller";

router.post("/", bookingController.createBooking);

export default router;
