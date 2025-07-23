export type BookingType = {
  id: string;
  resource: string;
  startTime: Date | string;
  endTime: Date | string;
  requestedBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};


export type State = {
  bookings: BookingType[];
  currentWeek: Date | string;
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
