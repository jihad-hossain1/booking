import bookingService from "@/services/booking.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const isParams = await params;
  const id = isParams.id;
 try {
    // Validate the id
    const deletedBooking = await bookingService.deleteBooking(id);

    return NextResponse.json({ ...deletedBooking });
 } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
 }
}


