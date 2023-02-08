import Divider from '@material-ui/core/Divider';
import GetAppIcon from '@material-ui/icons/GetApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useState } from 'react';


const InstallPwaListItem = (props: { key: string }) => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt]: any = useState(null);
  window.addEventListener('beforeinstallprompt', (event: Event) => {
    setShow(true);
    setDeferredPrompt(event);
  });
  const onButtonClick = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShow(false);
      }
    }
  }
  if (show) {
    return (
      <>
        <Divider />
        <ListItem button key={props.key} onClick={onButtonClick}>
          <ListItemIcon><GetAppIcon /></ListItemIcon>
          <ListItemText>Install</ListItemText>
        </ListItem>
      </>
    );
  } else {
    return <></>
  }
}

export default InstallPwaListItem;
