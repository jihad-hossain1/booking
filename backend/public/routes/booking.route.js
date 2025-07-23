"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const booking_controller_1 = __importDefault(require("../controllers/booking.controller"));
router.post("/", booking_controller_1.default.createBooking);
router.get("/", booking_controller_1.default.getBookings);
exports.default = router;
