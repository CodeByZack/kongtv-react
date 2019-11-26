import React from 'react';

const style = {
  position: "relative",
  paddingBottom: "140%"
};

const imgStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  width: "100%",
  height: "100%"
}

const RatioImage = (props) => {
  const { imgUrl, imgAlt, ratio = 1 } = props;

  const height = `${ratio*100}%`;

  const wrapperStyle = { 
    ...style,
    paddingBottom: height
  }

  return (
    <div className="img-wrapper" style={wrapperStyle}>
      <img src={imgUrl} alt={imgAlt} style={imgStyle}/>
    </div>
  );
};
export default RatioImage;
