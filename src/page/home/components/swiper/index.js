import React,{useState} from 'react';
import './style.less';

const Swiper = props => {
  
  const data = [1, 2, 3, 4, 5];

  const styles = [
    {
      transform: "translate(-150%, -50%) scale3d(0.8, 0.8, 0.8)",
      zIndex: 1
    },
    {
      transform: "translate(-100%, -50%) scale3d(0.9, 0.9, 0.9)",
      zIndex: 2
    },
    {
      transform: "translate(-50%, -50%) scale3d(1, 1, 1)",
      zIndex: 3
    },
    {
      transform: "translate(0%, -50%) scale3d(0.9, 0.9, 0.9)",
      zIndex: 2
    },
    {
      transform: "translate(50%, -50%) scale3d(0.8, 0.8, 0.8)",
      zIndex: 1
    },

  ];


  const [ da, setDa ] = useState(data);
  const [ _styles, setStyle ] = useState(styles);
  let xStart,yStart;

  const startHandle = (e) => {
    console.log(e.type);
    console.log(e.touches);
    xStart = e.touches[0].pageX;
    yStart = e.touches[0].pageY;
  }

  
  const moveHandle = (e) => {
    e.stopPropagation();
    let touch = e.touches[0];
    let x = touch.pageX, y = touch.pageY, offsetX = xStart - x, offsetY = yStart - y;
    if (offsetX <= -50) {
      // 向右
      // to do
      console.log("->");
      let _da = [...da];
      _da.unshift(_da.pop())
      let __styles = [..._styles];
      __styles.push(__styles.shift())
      // setDa(_da);
      setStyle(__styles)

    } else if (offsetX >= 50) {
      // 向左
      // to do
      console.log("<-")
      let _da = [...da];
      _da.push(_da.shift())
      let __styles = [..._styles];
      __styles.unshift(__styles.pop())
      // setDa(_da);
      setStyle(__styles)
    }
  }
  return (
    <div className="ks-swiper" onTouchStart={startHandle} onTouchMove={moveHandle} >
      {da.map((d, i) => {
        return <div className="ks-swiper-item" style={_styles[i]}>{d}</div>;
      })}
    </div>
  );
};

export default Swiper;
