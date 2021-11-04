import { CircularProgress, Backdrop, Stack } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';

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
  show: (toastProps: IProps, duration ?: number) => void;
  hide: () => void;
}

const Toast = (props: IProps) => {
  const { type = 'info', content } = props;
  return (
    <Backdrop open={true}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        {type === ToastType.Loading && <CircularProgress color="inherit" size={24} />}
        <span>{content}</span>
      </Stack>
    </Backdrop>
  );
};

export const ControlToast = forwardRef<IControlRef, IControlProps>((props, ref) => {
  const [toastProps, setToastProps] = useState<IProps>();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        show: (toastProps: IProps, duration?: number) => {
          setToastProps(toastProps);
          setVisible(true);
        },
        hide: () => {
          setToastProps(undefined);
          setVisible(false);
        },
      };
    },
    []
  );
  if (!toastProps || !visible) return null;
  return <Toast {...toastProps} />;
});

export default Toast;
