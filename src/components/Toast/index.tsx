import { createRef } from 'react';
import ReactDOM from 'react-dom';
import { ControlToast, IControlRef, ToastType } from './toast';

const createNotice = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let timerId: number;

  const destroy = () => {
    ReactDOM.unmountComponentAtNode(div);
  };

  const loading = (content: string, duration: number = 1000) => {
    const ref = createRef<IControlRef>();
    ReactDOM.render(<ControlToast ref={ref} />, div);
    ref.current?.show({
      type: ToastType.Loading,
      content,
    });

    if (timerId) {
      clearTimeout(timerId);
    }

    if (duration > 0) {
      setTimeout(destroy, duration);
    }
  };

  const info = (content: string, duration: number = 1000) => {
    const ref = createRef<IControlRef>();
    ReactDOM.render(<ControlToast ref={ref} />, div);
    ref.current?.show({
      type: ToastType.Info,
      content,
    });
    if (timerId) {
      clearTimeout(timerId);
    }

    if (duration > 0) {
      setTimeout(destroy, duration);
    }
  };

  return {
    loading,
    info,
    destroy,
  };
};

let notice: ReturnType<typeof createNotice>;

const getInstance = () => {
  if (!notice) {
    notice = createNotice();
  }
  return notice;
};

export default {
  info: (content: string, duration?: number) => getInstance().info(content, duration),
  loading: (content: string, duration?: number) => getInstance().loading(content, duration),
  destroy: () => getInstance().destroy(),
};
