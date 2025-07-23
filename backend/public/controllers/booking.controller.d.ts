import { Request, Response } from "express";
declare class BookingController {
    createBooking(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getBookings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: BookingController;
export default _default;
//# sourceMappingURL=booking.controller.d.ts.map