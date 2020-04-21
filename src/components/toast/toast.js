import React, { useRef } from 'react';
import { Icon } from '@/components';

const Toast = props => {
  const rel = useRef();
  const { type = 'info', content } = props;

  return (
    <div className="toast-mask">
      <div ref={rel} className={`toast-container`}>
        <Icon type={type} />
        {content}
      </div>
    </div>
  );
};

export default Toast;
