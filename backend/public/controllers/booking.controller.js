"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_service_1 = __importDefault(require("../services/booking.service"));
class BookingController {
    async createBooking(req, res) {
        try {
            const booking = await booking_service_1.default.create(req.body);
            return res.status(201).json(booking);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getBookings(req, res) {
        try {
            const bookings = await booking_service_1.default.getBookings(req.query);
            return res.status(200).json(bookings);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.default = new BookingController();
