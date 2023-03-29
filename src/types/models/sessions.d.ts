export type SessionsItem = {
  name: string;
  creation: number;
  status: string;
  sensors: [string];
};

export type SessionsState = {
  sessions: SessionsArray;
};

export type SessionsArray = Array<SessionsItem>;
