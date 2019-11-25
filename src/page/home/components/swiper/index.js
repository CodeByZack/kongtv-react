import React, { useState, useEffect } from 'react';
import './style.less';

const defaultStyle = { visibility: 'hidden', width: 0, height: 0 };
const styles = [
  {
    transform: 'translate(-150%, -50%) scale3d(0.8, 0.8, 0.8)',
    zIndex: 1,
  },
  {
    transform: 'translate(-100%, -50%) scale3d(0.9, 0.9, 0.9)',
    zIndex: 2,
  },
  {
    transform: 'translate(-50%, -50%) scale3d(1, 1, 1)',
    zIndex: 3,
  },
  {
    transform: 'translate(0%, -50%) scale3d(0.9, 0.9, 0.9)',
    zIndex: 2,
  },
  {
    transform: 'translate(50%, -50%) scale3d(0.8, 0.8, 0.8)',
    zIndex: 1,
  },
];

const calculatingStyle = (index, length) => {
  let resStyle = [];
  if (index === 0) {
    for (let i = 0; i < length; i++) {
      let _index = i - index;
      const style = styles[_index] ? styles[_index] : defaultStyle;
      resStyle.push(style);
    }
  } else if (index > 0) {
    for (let i = 0; i < length; i++) {
      let _index = i - index >= 0 ? i - index : i - index + length;
      const style = styles[_index] ? styles[_index] : defaultStyle;
      resStyle.push(style);
    }
  } else if (index < 0) {
    for (let i = 0; i < length; i++) {
      let _index = i - index > 4 ? i - index - length : i - index;
      const style = styles[_index] ? styles[_index] : defaultStyle;
      resStyle.push(style);
    }
  }
  // console.log( index );
  // console.log( resStyle );
  return resStyle;
};

const Swiper = props => {
  const { imgArr = [], autoPlay = true } = props;
  const { onSwiperItemClick = () => {} } = props;

  const [index, setIndex] = useState(0);
  const [_styles, setStyle] = useState([]);
  let xStart;
  const startHandle = e => {
    xStart = e.touches[0].pageX;
  };
  const moveHandle = e => {
    e.stopPropagation();
    let touch = e.touches[0];
    let x = touch.pageX,
      offsetX = xStart - x;
    if (offsetX <= -50) {
      // 向右
      // console.log('->');
      swipeRight();
    } else if (offsetX >= 50) {
      // 向左
      // console.log('<-');
      swipeLeft();
    }
  };
  const swipeRight = () => {
    if (index - 1 === -imgArr.length) {
      setIndex(0);
      setStyle(calculatingStyle(0, imgArr.length));
    } else {
      setIndex(index - 1);
      setStyle(calculatingStyle(index - 1, imgArr.length));
    }
  };
  const swipeLeft = () => {
    if (index + 1 === imgArr.length) {
      setIndex(0);
      setStyle(calculatingStyle(0, imgArr.length));
    } else {
      setIndex(index + 1);
      setStyle(calculatingStyle(index + 1, imgArr.length));
    }
  };

  useEffect(() => {
    if (!imgArr.length) return;
    const timer = setTimeout(() => {
      swipeRight();
    }, 2000);
    return () => clearTimeout(timer);
    //eslint-disable-next-line
  }, [imgArr, autoPlay, index]);
  useEffect(() => {
    if (imgArr.length !== 0) {
      setStyle(calculatingStyle(0, imgArr.length));
    }
  }, [imgArr]);

  return (
    <div
      className="ks-swiper"
      onTouchStart={startHandle}
      onTouchMove={moveHandle}
    >
      {imgArr.map((d, i) => {
        return (
          <div
            key={d.vod_id}
            className="ks-swiper-item"
            style={_styles[i]}
            onClick={() => onSwiperItemClick(d, i)}
          >
            <img src={d.vod_pic} alt={d.vod_name} />
          </div>
        );
      })}
    </div>
  );
};

export default Swiper;
