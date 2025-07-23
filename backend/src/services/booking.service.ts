import prisma from "lib/prisma";
import { BookingType } from "lib/schemas/type";
import { BookingRequest } from "./type";

type QueryProps = {
  page?: string;
  limit?: string;
};

class BookingService {
  async create(requestBody: BookingRequest) {
    const { resource, startTime, endTime, requestedBy } = requestBody;

    if (!resource || !startTime || !endTime || !requestedBy)
      return { error: "All fields are required", success: false };

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start)
      return { error: "End time must be after start time", success: false };

    const durationMinutes = (Number(end) - Number(start)) / (1000 * 60);

    if (durationMinutes < 15)
      return {
        error: "Booking duration must be at least 15 minutes",
        success: false,
      };

    if (durationMinutes > 120)
      return {
        error: "Booking duration cannot exceed 2 hours",
        success: false,
      };

    try {
      const existingBookings = await prisma.booking.findMany({
        where: {
          resource: resource,
        },
      });

      if (this.hasConflict(start, end, existingBookings)) {
        return {
          error:
            "Booking conflicts with existing reservation (including 10-minute buffer)",
          success: false,
        };
      }

      const booking = await prisma.booking.create({
        data: {
          resource,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          requestedBy,
        },
      });
      return {
        success: true,
        data: booking,
      };
    } catch (error) {
      console.error((error as Error).message);
      return { error: "Internal server error", success: false };
    }
  }

  async getBookings(query: QueryProps) {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: {
          startTime: "asc",
        },
      });
      return {
        success: true,
        data: bookings,
      };
    } catch (error) {
      console.error((error as Error).message);
      return { error: "Internal server error", success: false };
    }
  }

  hasConflict(newStart: Date, newEnd: Date, existingBookings: BookingType[]) {
    const BUFFER_MINUTES = 10;

    for (const booking of existingBookings) {
      const existingStart = new Date(booking.startTime);
      const existingEnd = new Date(booking.endTime);

      // Add buffer time (10 minutes before and after existing booking)
      const bufferedStart = new Date(
        existingStart.getTime() - BUFFER_MINUTES * 60000
      );
      const bufferedEnd = new Date(
        existingEnd.getTime() + BUFFER_MINUTES * 60000
      );

      // Check if new booking overlaps with buffered existing booking
      if (newStart < bufferedEnd && newEnd > bufferedStart) {
        return true;
      }
    }

    return false;
  }
}

export default new BookingService();
