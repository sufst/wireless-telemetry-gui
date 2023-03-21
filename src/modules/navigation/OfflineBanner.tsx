import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useStyles } from "../alert/styles";

// See https://www.30secondsofcode.org/react/s/use-navigator-on-line/
export const useOnline = () => {
  const [online, setOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handler = (e: any) => {setOnline(navigator.onLine);console.log(navigator.onLine,e)};
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  }, []);

  return online;
};

const OfflineBanner = () => {
  const classes = useStyles();

  const offline = useSelector((state: RootState) => state.app).offline;

  if (offline) {
    console.log("Offline");
    return (
      <MuiAlert
        elevation={6}
        variant="filled"
        className={classes.alert}
        severity="error"
      >
        You are offline
      </MuiAlert>
    );
  } else {
    console.log("Online");
    return <></>;
  }
};

export default OfflineBanner;
