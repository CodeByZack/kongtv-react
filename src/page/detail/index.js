import React from "react";
import { NavBar,Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import "./style.less";
const MovieDetail = (props) => {
  const { history, location } = props;
  const movie = location.state.movie;

  let playUrls = movie.vod_play_url;
  playUrls = playUrls.split("#").map((d)=>{
    const temp = d.split("$");
    return { text : temp[0],link:temp[1] };
  });


  const onPlayClick = (item)=>()=>{
    console.log(item);
    history.push({ pathname: "/play", state: { data:{title:movie.vod_name,...item} }});
  }

  return (
    <div className="movie-detail-wrapper">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        {movie.vod_name}
      </NavBar>

      <div className="movie-detail-top">
        <div className="movie-pic">
          <img src={movie.vod_pic} alt={movie.vod_name}/>
        </div>
        <div className="movie-info">
          <p>导演:{movie.vod_director}</p>
          <p>主演:{movie.vod_actor}</p>
          <p>类型:{movie.vod_class}</p>
          <p>地区:{movie.vod_area}</p>
          <p>语言:{movie.vod_remarks}</p>
        </div>

      </div>

      <div className="movie-detail-desc">
        <h3>简介：</h3>
        <p>{movie.vod_content}</p>
      </div>

      <div className="movie-play-list">
        <p><Icon type="loading"/>剧集列表</p>
        <div className="list-container">
          {
            playUrls.map(url=>{
              return <div 
              className="play-item"
              onClick={onPlayClick(url)}
              >{url.text}</div>
            })
          }
        </div>
      </div>
    </div>
  );
};
export default withRouter(MovieDetail);
