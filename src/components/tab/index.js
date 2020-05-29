import React, { useState, useEffect, useRef } from 'react';
import './style.less';

let pageX, pageY, isMove;

const Tab = props => {
  let {
    tabs = [],
    initialPage = 0,
    onChange,
    onTabClick,
    children = [],
  } = props;

  const [nowTab, setNowTab] = useState(0);
  const tabRef = useRef();
  useEffect(() => {
    setNowTab(initialPage);
  }, [initialPage]);

  // useEffect(()=>{
  //   if(onTabClick){
  //     onTabClick(nowTab);
  //   }
  // },[nowTab]);

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

  const onTouchStart = e => {
    console.log(e.touches);
    pageX = e.touches[0].pageX;
    pageY = e.touches[0].pageY;
    isMove = true;
  };
  const onTouchMove = e => {
    if (isMove) {
      // const scrollWidth = tabRef.current.scrollWidth;
      // const overX = scrollWidth/tabs.length/3;
      // const nowPageX = e.changedTouches[0].pageX;
      // const deltaX = pageX - nowPageX;
      // console.log(tabRef.current.scrollLeft);
      // // console.log(nowPageX,pageX);
      // if(nowPageX - pageX > 0){
      //   console.log("swipe right")
      // }else if(nowPageX - pageX < 0){
      //   console.log("swipe left")
      // }
    }
  };
  const onTouchEnd = e => {
    isMove = false;
    const scrollWidth = tabRef.current.scrollWidth;
    const overX = scrollWidth / tabs.length / 3;
    const nowPageX = e.changedTouches[0].pageX;
    const deltaX = pageX - nowPageX;
    // console.log(nowPageX,pageX);
    if (deltaX > 0) {
      console.log('swipe right', deltaX, overX);
      if (deltaX < overX) {
        // scrollToTab(nowTab);
      } else {
        let newTab = nowTab + 1;
        newTab = newTab < tabs.length ? newTab : tabs.length - 1;
        setNowTab(newTab);
        onTabClick(newTab);

        // scrollToTab(newTab);
      }
    } else if (deltaX < 0) {
      console.log('swipe left', deltaX, overX);
      if (-deltaX < overX) {
        // scrollToTab(nowTab);
      } else {
        let newTab = nowTab - 1;
        newTab = newTab >= 0 ? newTab : 0;
        console.log(newTab);
        onTabClick(newTab);
        setNowTab(newTab);
        // scrollToTab(newTab);
      }
    }
  };
  const underlineStyle = {
    width: `${100 / tabs.length}%`,
    left: `${(100 / tabs.length) * nowTab}%`,
  };

  return (
    <div className="tabs">
      <div className="tabs-bar">
        {createTabBars(tabs)}
        <span className="bar-underline" style={underlineStyle}></span>
      </div>
      <div
        ref={tabRef}
        className="tabs-content"
        // onTouchStart={onTouchStart}
        // onTouchMove={onTouchMove}
        // onTouchEnd={onTouchEnd}
      >
        <div key={nowTab}>{children[nowTab]}</div>
        {/* {createTabContents(children)} */}
      </div>
    </div>
  );
};
export default Tab;
