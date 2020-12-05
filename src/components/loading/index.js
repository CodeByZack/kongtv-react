import { CircularProgress, Paper } from '@material-ui/core';
import React from 'react';
import './style.less';

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const fullStyle = {
  width: '100vw',
  height: '100vh',
};

const Loading = props => {
  const { fullpage } = props;

  if (fullpage) {
    return (
      <Paper style={{ ...fullStyle, ...centerStyle }}>
        <CircularProgress />
      </Paper>
    );
  } else {
    return (
      <div style={{ ...centerStyle, padding: 10 }}>
        <CircularProgress size={20} />
      </div>
    );
  }
};
export default Loading;
