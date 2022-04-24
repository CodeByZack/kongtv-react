import { Fade, useScrollTrigger } from '@mui/material';
import { PropsWithChildren } from 'react';

const HideOnScroll = (props: PropsWithChildren<any>) => {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Fade appear={false} in={!trigger}>
      {children}
    </Fade>
  );
};
export default HideOnScroll;
