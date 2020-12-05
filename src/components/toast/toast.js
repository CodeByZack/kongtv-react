import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Toast = props => {
  const { type = 'info', content } = props;
  return (
    <div className="toast-mask">
      <div className={`toast-container`}>
        {type === 'loading' && (
          <CircularProgress style={{ marginBottom: 8 }} color="inherit" size={24} />
        )}
        <span className="toast-text">{content}</span>
      </div>
    </div>
  );
};

export default Toast;
