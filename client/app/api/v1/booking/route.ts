import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const bookings = await prisma.booking.findMany();
        return NextResponse.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error,
        });
    }
}
