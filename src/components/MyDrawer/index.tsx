import { Drawer } from '@material-ui/core';
import { noop } from '../../types/constant';

interface IProps {
  open: boolean;
  onClose?: () => void;
}

const MyDrawer = (props: IProps) => {
  const { open, onClose = noop } = props;
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      侧边栏TODO
    </Drawer>
  );
};
export default MyDrawer;
