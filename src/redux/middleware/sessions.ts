import { createAlert } from "modules/alert/alert";
import { getAllSessions } from "modules/api/sessions";
import { Middleware } from "redux";
import { showAlert } from "redux/slices/alert";

export const sessionsMiddleware: Middleware<{}, any> = (storeAPI) => (next) => async (action) => {
  if (storeAPI.getState().sessionList == [] && action.type === 'session/getAllSessions') {
    const [sessions] = await getAllSessions();
    if (sessions) {
      storeAPI.dispatch(sessions);
    } else {
      const offlineAlert = createAlert(3000, "error", "alert", "Can't get sessions list as you are offline");
      storeAPI.dispatch(showAlert(offlineAlert));
    }
  }

  return next(action);
}
