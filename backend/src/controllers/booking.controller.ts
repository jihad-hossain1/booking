import { Request, Response } from "express";
import bookingService from "services/booking.service";

class BookingController {
  async createBooking(req: Request, res: Response) {
    try {
      const booking = await bookingService.create(req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default new BookingController();
