import bookingService from "@/services/booking.service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const date = searchParams.get("date");

    try {
        const bookings = await bookingService.getBookings({
            query: query || "",
            date: date || "",
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error,
        });
    }
}

export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    try {
        const booking = await bookingService.create(requestBody);
        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error,
        });
    }
}
