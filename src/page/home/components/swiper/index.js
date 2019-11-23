import React from 'react';
import './style.less';

const Swiper = props => {
  const data = [{}, {}, {}, {}, {}];

  return (
    <div className="ks-swiper">
      {data.map((d, i) => {
        return <div className="ks-swiper-item">{i}</div>;
      })}
    </div>
  );
};

export default Swiper;
