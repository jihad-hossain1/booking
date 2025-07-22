
export type  LoginInterface =  {
  userId: string;
  name: string;
  email: string;
}

export const loginInitialState: LoginInterface = {
  userId: "",
  name: "",
  email: "",
};

export enum LocalStorageKeys {
  AUTH = "auth",
}
