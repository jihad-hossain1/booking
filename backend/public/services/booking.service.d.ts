import { BookingType } from "@/lib/schemas/type";
import { BookingRequest } from "./type";
type QueryProps = {
    page?: string;
    limit?: string;
};
declare class BookingService {
    create(requestBody: BookingRequest): Promise<{
        error: string;
        success: boolean;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            id: string;
            resource: string;
            startTime: Date;
            endTime: Date;
            requestedBy: string;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    }>;
    getBookings(query: QueryProps): Promise<{
        success: boolean;
        data: {
            id: string;
            resource: string;
            startTime: Date;
            endTime: Date;
            requestedBy: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        error?: undefined;
    } | {
        error: string;
        success: boolean;
        data?: undefined;
    }>;
    hasConflict(newStart: Date, newEnd: Date, existingBookings: BookingType[]): boolean;
}
declare const _default: BookingService;
export default _default;
//# sourceMappingURL=booking.service.d.ts.map