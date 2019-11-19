import React from 'react';
import { Icon } from 'antd-mobile';
import './style.less';
const HomeItem = ()=>{

  return(
    <div className="home-item-section">
      <div className="home-item-title">
        <Icon type="search"/>热播电影
      </div>
    </div>
  )
}

export default HomeItem;