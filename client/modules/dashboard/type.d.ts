export type BookingType = {
  id: string;
  resource: string;
  startTime: Date | string;
  endTime: Date | string;
  requestedBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type SortColumn = keyof BookingType;
export type SortDirection = "asc" | "desc";

export type State = {
  bookings: BookingType[];
  filter: {
    query?: string;
  };
  sort: {
    column: SortColumn;
    direction: SortDirection;
  };
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SetStateAction = {
  type: "SET_STATE";
  payload: State;
};

export type UpdateState = {
  type: "UPDATE_STATE";
  payload: Partial<State>;
};

export type ResetAction = {
  type: "RESET";
};

export type Action = SetStateAction | UpdateState | ResetAction;
