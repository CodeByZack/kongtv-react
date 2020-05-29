import React from 'react';
import './icon.css';

const Icon = props => {
  const { type, onClick } = props;
  return <i onClick={onClick} className={`iconfont icon-${type}`} />;
};

export default Icon;
