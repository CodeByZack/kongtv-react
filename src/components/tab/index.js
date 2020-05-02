import React, { useState, useEffect } from 'react';
import './style.less';
const Tab = props => {
  
  let {
    tabs = [],
    initialPage = 0,
    onChange,
    onTabClick,
    children = [],
  } = props;
  
  const [nowTab, setNowTab] = useState(0);
  
  useEffect(()=>{
    setNowTab(initialPage);
  },[initialPage]);
  
  if (tabs.length < children.length) {
    children = children.slice(0, tabs.length);
  }

  const onTabBarClick = index => () => {
    setNowTab(index);
    onTabClick(index);
  };

  const createTabBars = tabs => {
    return tabs.map((tab, index) => {
      return (
        <div
          onClick={onTabBarClick(index)}
          className={`tabs-bar-item ${nowTab === index ? 'choose' : ''}`}
          key={tab.sub}
        >
          {tab.title}
        </div>
      );
    });
  };

  //todo
  const createTabContents = children => {
    return children.map((child, index) => {
      const style = {
        left: `${(index - nowTab) * 100}%`,
        display: `${index === nowTab ? 'block' : 'null'}`,
      };

      return (
        <div style={style} className="tabs-content-item">
          {child}
        </div>
      );
    });
  };

  const underlineStyle = {
    width: `${100 / tabs.length}%`,
    left: `${(100 / tabs.length) * nowTab}%`,
  };

  return (
    <div className="tabs">
      <div className="tabs-bar">
        {createTabBars(tabs)}
        <span className="bar-underline" style={{}}></span>
      </div>
      <div className="tabs-content">
        {/* <div key={nowTab}>{children[nowTab]}</div> */}
        {createTabContents(children)}
      </div>
    </div>
  );
};
export default Tab;
