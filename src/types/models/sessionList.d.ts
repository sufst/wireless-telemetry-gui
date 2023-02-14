export type SessionListItem = {
  name: string,
  creation: number,
  status: string,
  sensors: [],
}

export type SessionListState = [
  SessionListItem,
]

export const createSessionListState: SessionListState = () => {
  return [];
}
