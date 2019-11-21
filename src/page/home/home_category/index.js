import React,{ useEffect,useRef } from "react";
import MovieList from "../components/movieList/";
import './style.less';

const HomeCategory = (props) => {
  const { data, type } = props;

  const realDom = useRef(null);

  console.log(type);
  useEffect(()=>{
    console.log(realDom.current);
    const handleScroll = ()=>{
      let clientHeight = document.body.clientHeight;
      var rect = realDom.getBoundingClientRect();
      console.log(rect);
      console.log("========")
    };
    realDom.current.addEventListener("scroll",handleScroll);
    return ()=>realDom.current.removeEventListener("scroll",handleScroll);
  },[]);

  return (
    <div ref={realDom} className="home_category_page">
      <MovieList movies={data} />
    </div>
  );
};
export default HomeCategory;
