import { getAllSessions } from "modules/api/sessions";
import { Middleware } from "redux";
import { setOffline, setOnline } from "redux/slices/app";
import { replaceSessions } from "redux/slices/sessions";

export const sessionsMiddleware: Middleware<{}, any> = (storeAPI) => (next) => async (action) => {
  if ((storeAPI.getState().sessions.sessions.length === 0 && action.type === 'sessions/getAllSessions') || action.type === 'sessions/refreshSessions') {
    const [sessions] = await getAllSessions();
    if (sessions) {
      storeAPI.dispatch(setOnline());
      storeAPI.dispatch(replaceSessions(sessions));
    } else {
      storeAPI.dispatch(setOffline());
    }
  }

  return next(action);
}
