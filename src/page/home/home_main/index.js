import React, { useState } from "react";
import HomeItem from "./home_item";
import { Carousel } from "antd-mobile";

const HomeMain = (props) => {
  const { data } = props;
  const [minHeight, setMinHeight] = useState(176);

  const dy = data.filter(movie=>movie.vod_level === "1");
  const dsj = data.filter(movie=>movie.vod_level === "2");
  const zy = data.filter(movie=>movie.vod_level === "4");
  const dm = data.filter(movie=>movie.vod_level === "3");

  return (
    <div className="home_main_page">
      {getSwiper(minHeight, setMinHeight)}
      <HomeItem title={"热播电影"} movies={dy}/>
      <HomeItem title={"热播影视"} movies={dsj}/>
      <HomeItem title={"热播综艺"} movies={dm}/>
      <HomeItem title={"热播动漫"} movies={zy}/>
    </div>
  );
};
export default HomeMain;



const getSwiper = (minHeight, setMinHeight) => {
  return (
    <Carousel
      autoplay={true}
      infinite
      beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
      afterChange={index => console.log("slide to", index)}
    >
      {[1, 2, 3].map(val => (
        <a
          key={val}
          href="http://www.alipay.com"
          style={{
            display: "inline-block",
            width: "100%",
            height: minHeight
          }}
        >
          <img
            src={`https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png`}
            alt=""
            style={{ width: "100%", verticalAlign: "top" }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event("resize"));
              setMinHeight("auto");
            }}
          />
        </a>
      ))}
    </Carousel>
  );
};