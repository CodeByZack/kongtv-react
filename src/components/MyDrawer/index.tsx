import {
  Drawer,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { noop } from '../../types/constant';
import drawerImg from '../../assets/sun_main.png';
import logoImg from '../../assets/logo192.png';

interface IProps {
  open: boolean;
  onClose?: () => void;
  menus?: { txt: string; icon: React.ReactNode; onClick?: (txt: string) => void }[];
}

const MyDrawer = (props: IProps) => {
  const { open, onClose = noop, menus = [] } = props;
  return (
    <Drawer PaperProps={{ sx: { width: '75%' } }} anchor="left" open={open} onClose={onClose}>
      <ImageListItem key="drawer-img">
        <img src={drawerImg} alt="像风一样自由～" loading="lazy" />
        <ImageListItemBar
          title="风影院"
          subtitle="version1.0"
          actionPosition="left"
          actionIcon={
            <IconButton sx={{ pr: 1 }}>
              <img width="40" height="40" src={logoImg} />
            </IconButton>
          }
        />
      </ImageListItem>
      <List component="nav">
        {menus.map((menu) => {
          const { txt, icon, onClick = noop } = menu;
          return (
            <ListItem key={txt} button onClick={() => onClick('watchhistory')}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText secondary={txt} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
export default MyDrawer;
