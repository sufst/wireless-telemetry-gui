import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
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

  const online = useOnline();

  if (online) {
    console.log("Online");
    return <></>;
  } else {
    console.log("Offline");
    return (
      <MuiAlert
        elevation={6}
        variant="filled"
        className={classes.alert}
        severity="info"
      >
        You are offline
      </MuiAlert>
    );
  }
};

export default OfflineBanner;
