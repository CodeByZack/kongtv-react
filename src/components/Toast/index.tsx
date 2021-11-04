import { createRef } from 'react';
import ReactDOM from 'react-dom';
import { ControlToast, IControlRef, ToastType } from './toast';

const createNotice = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const loading = (content: string) => {
    const ref = createRef<IControlRef>();
    ReactDOM.render(<ControlToast ref={ref} />, div);
    ref.current?.show({
      type: ToastType.Loading,
      content,
    });
  };

  const info = (content: string) => {
    const ref = createRef<IControlRef>();
    ReactDOM.render(<ControlToast ref={ref} />, div);
    ref.current?.show({
      type: ToastType.Info,
      content,
    });
  };

  const destroy = () => {
    ReactDOM.unmountComponentAtNode(div);
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
  info: (content: string) => getInstance().info(content),
  loading: (content: string) => getInstance().loading(content),
  destroy: () => getInstance().destroy(),
};
