export type SessionsItem = {
  name: string,
  creation: number,
  status: string,
  sensors: [],
}

export type SessionsState = Array<SessionsItem>;
