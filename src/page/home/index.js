import React, { useState } from "react";
import { NavBar, Icon, SearchBar, Carousel } from "antd-mobile";
import HomeItem from './home_item';

const Home = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [minHeight, setMinHeight] = useState(176);
  return (
    <div className="home-page">
      {getHeader(showSearch, toggleSearch)}
      {getSwiper(minHeight, setMinHeight)}
      <HomeItem/>
    </div>
  );
};

export default Home;

const getHeader = (showSearch, toggleSearch) => {
  return !showSearch ? (
    <NavBar
      mode="light"
      icon={<Icon type="ellipsis" />}
      onLeftClick={() => toggleSearch(true)}
      rightContent={[
        <Icon key="0" type="search" onClick={() => toggleSearch(true)} />
      ]}
    >
      风影院
    </NavBar>
  ) : (
    <SearchBar
      placeholder="Search"
      onBlur={() => toggleSearch(false)}
      onCancel={() => toggleSearch(false)}
      showCancelButton
      style={{ height: 45 }}
      onChange={() => {
        console.log("onchange");
      }}
    />
  );
};
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
