export type BookingType = {
  id: string;
  resource: string;
  startTime: Date | string;
  endTime: Date | string;
  requestedBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};
