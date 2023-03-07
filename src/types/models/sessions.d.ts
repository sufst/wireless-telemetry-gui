export type SessionsItem = {
  name: string,
  creation: number,
  status: string,
  sensors: [string],
}

export type SessionsState = Array<SessionsItem>;
