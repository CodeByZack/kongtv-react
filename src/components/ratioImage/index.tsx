import DefaultImg from '../../assets/placeholder.png';
const style = {
  position: 'relative',
  paddingBottom: '140%',
};

const imgStyle: any = {
  position: 'absolute',
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};
const errImg = (e: any, DefaultImg: string) => {
  e.target.src = DefaultImg;
};
const RatioImage = (props: any) => {
  const { imgUrl, imgAlt, ratio = 1 } = props;

  const height = `${ratio * 100}%`;

  const wrapperStyle: any = {
    ...style,
    paddingBottom: height,
  };

  return (
    <div className="img-wrapper" style={wrapperStyle}>
      {/* <img src={imgUrl} alt={imgAlt} style={imgStyle} onError={e => (e.target.src = DefaultImg)} /> */}
      <img src={imgUrl} alt={imgAlt} style={imgStyle} onError={(e) => errImg(e, DefaultImg)} />
    </div>
  );
};
export default RatioImage;
