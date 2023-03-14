import { createAlert } from "modules/alert/alert";
import { getAllSessions } from "modules/api/sessions";
import { Middleware } from "redux";
import { showAlert } from "redux/slices/alert";
import { replaceSessions } from "redux/slices/sessions";

export const sessionsMiddleware: Middleware<{}, any> = (storeAPI) => (next) => async (action) => {
  if ((storeAPI.getState().sessions.sessions.length === 0 && action.type === 'sessions/getAllSessions') || action.type === 'sessions/refreshSessions') {
    const [sessions] = await getAllSessions();
    if (sessions) {
      storeAPI.dispatch(replaceSessions(sessions));
    } else {
      const offlineAlert = createAlert(3000, "error", "alert", "Can't get sessions list as you are offline");
      storeAPI.dispatch(showAlert(offlineAlert));
    }
  }

  return next(action);
}
