import React from "react";
import MovieList from "../components/movieList/";
import './style.less';

const movies =  [
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
const HomeCategory = props => {
  return (
    <div className="home_category_page">
      <MovieList movies={movies} />
    </div>
  );
};
export default HomeCategory;
