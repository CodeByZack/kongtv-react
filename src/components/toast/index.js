import ReactDOM from 'react-dom';
import React from 'react';
import Notification from './notification';

const createNotification = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notification />, div);
  return {
    showNotice(notice) {
      return notification.addNotice(notice);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
};

let notification;

const notice = (type, content, duration = 1000, onclose) => {
  if (!notification) notification = createNotification();

  return notification.showNotice({ type, content, duration, onclose });
};

const hideAll = () => {
  if (notification) {
    notification.destroy();
    notification = null;
  }
};

export default {
  info: (content, duration, onclose) => {
    notice('info', content, duration, onclose);
  },
  warn: (content, duration, onclose) => {
    notice('warn', content, duration, onclose);
  },
  error: (content, duration, onclose) => {
    notice('error', content, duration, onclose);
  },
  loading: (content, duration = 0, onclose) => {
    notice('loading', content, duration, onclose);
  },
  hide: () => {
    hideAll();
  },
};
