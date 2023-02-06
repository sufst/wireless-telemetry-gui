import GetAppIcon from '@material-ui/icons/GetApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useState } from 'react';


const InstallListItem = (props: {key: string}) => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt ]: any = useState(null);
  window.addEventListener('beforeinstallprompt', (event: Event) => {
    setShow(true);
    setDeferredPrompt(event);
  });
  const click = async () => {
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
      <ListItem button key={props.key} onClick={click}>
        <ListItemIcon><GetAppIcon /></ListItemIcon>
        <ListItemText>Install</ListItemText>
      </ListItem>
    );
  } else {
    return <></>
  }
}

export default InstallListItem;
