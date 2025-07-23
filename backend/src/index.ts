import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookingRouter from "./routes/booking.route";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send(" <-Booking API is running ->");
});

app.use("/api/v1/booking", bookingRouter);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;