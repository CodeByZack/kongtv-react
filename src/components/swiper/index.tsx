import React, { useState, useEffect } from 'react';
import RatioImage from '../ratioImage';
import './style.css';
import { swiperStyle, setSwipeType } from '../../types/swiper';
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

const calculatingStyle = (index: number, length: number): swiperStyle[] => {
  let resStyle: swiperStyle[] = [];
  for (let i = 0; i < length; i++) {
    let _index = !index
      ? i - index
      : index > 0
      ? i - index >= 0
        ? i - index
        : i - index + length
      : i - index > 4
      ? i - index - length
      : i - index;
    const style = styles[_index] ?? defaultStyle;
    resStyle.push(style);
  }
  // console.log( index,'index' );
  // console.log( resStyle,'resStyle' );
  return resStyle;
};

const Swiper = (props: any): any => {
  const { imgArr = [], autoPlay = true, onSwiperItemClick = () => {} } = props;
  const [index, setIndex] = useState(0);
  const [_styles, setStyle]: [any, any] = useState([]);
  let xStart: number;
  const startHandle = (e: any): void => {
    e.stopPropagation();
    xStart = e.touches[0].pageX;
  };
  const moveHandle = (e: any): void => {
    e.stopPropagation();
    let touch = e.touches[0];
    xStart - touch.pageX <= -50 && swiperFn(index, 'right');
    xStart - touch.pageX >= 50 && swiperFn(index, 'left');
  };

  const setIndexFn: setSwipeType = (index: number, direction: string): number => {
    let _index =
      direction === 'left'
        ? index - 1 === -imgArr.length
          ? 0
          : index - 1
        : index + 1 === imgArr.length
        ? 0
        : index + 1;
    return _index;
  };
  const swiperFn: setSwipeType = (index: number, direction: string): void => {
    let _index = setIndexFn(index, direction);
    setIndex(_index);
    setStyle(calculatingStyle(_index, imgArr.length));
  };
  useEffect(() => {
    if (!imgArr.length) return;
    const timer = setTimeout(() => swiperFn(index, 'right'), 2000);
    return () => clearTimeout(timer);
    //eslint-disable-next-line
  }, [imgArr, autoPlay, index]);
  useEffect(() => {
    imgArr.length && setStyle(calculatingStyle(0, imgArr.length));
  }, [imgArr]);

  return (
    <div className="ks-swiper" onTouchStart={startHandle} onTouchMove={moveHandle}>
      {imgArr.map((d: any, i: any) => {
        return (
          <div
            key={d.vod_id}
            className="ks-swiper-item"
            style={_styles[i]}
            onClick={() => onSwiperItemClick(d, i)}
          >
            {/* <img src={d.vod_pic} alt={d.vod_name} /> */}
            <RatioImage imgUrl={d.vod_pic} ratio={1.4} />
          </div>
        );
      })}
    </div>
  );
};

export default Swiper;
