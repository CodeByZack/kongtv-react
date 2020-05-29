import React from 'react';
import './style.less';

const NavBar = props => {
  const { icon, leftContent, rightContent, onLeftClick, children } = props;
  return (
    <div className="nav-bar">
      <div className="nav-bar-left" onClick={onLeftClick}>
        {icon}
        {leftContent}
      </div>
      <div className="nav-bar-title">{children}</div>
      <div className="nav-bar-right">{rightContent}</div>
    </div>
  );
};
export default NavBar;
