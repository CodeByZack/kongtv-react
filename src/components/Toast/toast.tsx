import { CircularProgress, Backdrop, Stack, Typography, Box } from '@mui/material';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export enum ToastType {
  Loading,
  Info,
}

interface IProps {
  type: ToastType;
  content: string;
}

interface IControlProps {}

export interface IControlRef {
  show: (toastProps: IProps, duration?: number) => void;
  hide: () => void;
}

const Toast = (props: IProps) => {
  const { type = 'info', content } = props;
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <Stack
        sx={{
          bgcolor: 'text.secondary',
          color: 'background.paper',
          p: 2,
        }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {type === ToastType.Loading && <CircularProgress color="inherit" size={24} />}
        <Typography>{content}</Typography>
      </Stack>
    </Box>
  );
};

export const ControlToast = forwardRef<IControlRef, IControlProps>((props, ref) => {
  const [toastProps, setToastProps] = useState<IProps>();
  const [visible, setVisible] = useState(false);

  const hide = () => {
    setToastProps(undefined);
    setVisible(false);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        show: (toastProps: IProps) => {
          setToastProps(toastProps);
          setVisible(true);
        },
        hide,
      };
    },
    []
  );
  if (!toastProps || !visible) return null;
  return <Toast {...toastProps} />;
});

export default Toast;
