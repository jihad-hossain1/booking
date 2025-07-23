import prisma from "@/prisma";
import { BookingType } from "@/lib/schemas/type";
import { BookingRequest } from "./type";

type QueryProps = {
    query?: string;
    date?: string | Date;
};

class BookingService {
    // create booking
    async create(requestBody: BookingRequest) {
        const { resource, startTime, endTime, requestedBy } = requestBody;

        if (!resource || !startTime || !endTime || !requestedBy) return { error: "All fields are required", success: false };

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (end <= start) return { error: "End time must be after start time", success: false };

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
                    error: "Booking conflicts with existing reservation (including 10-minute buffer)",
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

    // get all bookings
    async getBookings(query: QueryProps) {

        let where = {} as unknown as {
            resource?: string;
            startTime?: {
                gte?: Date;
                lte?: Date;
            };
        };

        if (query?.query) {
            where.resource = query.query;
        }
        
        if (query?.date) {
            const startOfDay = new Date(query?.date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(query?.date);
            endOfDay.setHours(23, 59, 59, 999);

            where.startTime = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }
        try {
            const bookings = await prisma.booking.findMany({
                where,
                orderBy: {
                    startTime: "asc",
                },
            });
            return bookings
        } catch (error) {
            console.error((error as Error).message);
            return { error: "Internal server error", success: false };
        }
    }

    // remove booking by id
    async deleteBooking(id: string) {
        // validate object id
        try {
            const isBooking = await this.getBooking(id);
            if (!isBooking?.success) return { ...isBooking };

            const booking = await prisma.booking.delete({
                where: {
                    id,
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

    // get booking by id
    async getBooking(id: string) {
        // validate object id
        try {
            const isBooking = this.validateObjectId(id);
            if (!isBooking) return { error: "Booking id invalid", success: false };

            const booking = await prisma.booking.findFirst({
                where: {
                    id,
                },
            });
            if (!booking) return { error: "Booking not found", success: false };
            return {
                success: true,
                data: booking,
            };
        } catch (error) {
            console.error((error as Error).message);
            return { error: (error as Error).message, success: false };
        }
    }

    // check if booking has conflict
    hasConflict(newStart: Date, newEnd: Date, existingBookings: BookingType[]) {
        const BUFFER_MINUTES = 10;

        for (const booking of existingBookings) {
            const existingStart = new Date(booking.startTime);
            const existingEnd = new Date(booking.endTime);

            // Add buffer time (10 minutes before and after existing booking)
            const bufferedStart = new Date(existingStart.getTime() - BUFFER_MINUTES * 60000);
            const bufferedEnd = new Date(existingEnd.getTime() + BUFFER_MINUTES * 60000);

            // Check if new booking overlaps with buffered existing booking
            if (newStart < bufferedEnd && newEnd > bufferedStart) {
                return true;
            }
        }

        return false;
    }

    // validate object id
    validateObjectId(id: string) {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return objectIdRegex.test(id);
    }
}

export default new BookingService();
