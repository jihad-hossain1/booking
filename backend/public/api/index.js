"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const booking_route_1 = __importDefault(require("../routes/booking.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.get("/", (req, res) => {
    res.send(" <-Booking API is running ->");
});
app.use("/api/v1/booking", booking_route_1.default);
// Export the Express app for Vercel serverless deployment
module.exports = app;
exports.default = app;
//# sourceMappingURL=index.js.map