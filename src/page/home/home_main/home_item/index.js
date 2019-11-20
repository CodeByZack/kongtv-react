import React from "react";
import { Icon } from "antd-mobile";
import MovieList from "../../components/movieList/"
import "./style.less";

const uidata = {
  title: "热播电影",
  movies: [
    {
      title: "关云长",
      pic:
        "https://rpg.pic-imges.com/pic/upload/vod/2019-11/201911171573993043.jpg"
    },
    {
      title: "关云长",
      pic:
        "https://rpg.pic-imges.com/pic/upload/vod/2019-11/201911171573993043.jpg"
    },
    {
      title: "关云长",
      pic:
        "https://rpg.pic-imges.com/pic/upload/vod/2019-11/201911171573993043.jpg"
    },
    {
      title: "关云长",
      pic:
        "https://rpg.pic-imges.com/pic/upload/vod/2019-11/201911171573993043.jpg"
    },
    {
      title: "关云长",
      pic:
        "https://rpg.pic-imges.com/pic/upload/vod/2019-11/201911171573993043.jpg"
    },
    {
      title: "关云长",
      pic:
        "https://rpg.pic-imges.com/pic/upload/vod/2019-11/201911171573993043.jpg"
    }
  ]
};

const HomeItem = () => {
  return (
    <div className="home-item-section">
      <div className="home-item-title">
        <Icon type="search" />
        {uidata.title}
      </div>
      <MovieList movies = { uidata.movies } />
    </div>
  );
};

export default HomeItem;
