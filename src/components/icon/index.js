import React from 'react';
import './icon.css';

const Icon = props => {
  const { type, size, onClick } = props;
  return <i onClick={onClick} className={`iconfont icon-${type}`} />;
};

export default Icon;
