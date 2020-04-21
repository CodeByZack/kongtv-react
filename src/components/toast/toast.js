import React from 'react';
import { Icon } from '@/components';

const Toast = props => {
  const { type = 'info', content } = props;

  return (
    <div className="toast-mask">
      <div className={`toast-container`}>
        <Icon type={type} />
        {content}
      </div>
    </div>
  );
};

export default Toast;
