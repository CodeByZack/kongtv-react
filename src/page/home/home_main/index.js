import React from 'react';
import HomeItem from './home_item';
import Swiper from '../components/swiper';
import { jumpToDetail } from '../../../utils/jumpUtil';

const HomeMain = props => {
  const { data } = props;

  const dy = data.filter(movie => movie.type_id_1 === '1');
  const dsj = data.filter(movie => movie.type_id_1 === '2');
  const zy = data.filter(movie => movie.type_id === '3');
  const dm = data.filter(movie => movie.type_id === '4');

  const swipers = [dy[0], dsj[0], zy[0], dm[0], dy[1]].filter(i => i);

  const onSwiperItemClick = movie => jumpToDetail(movie);

  return (
    <div className="home_main_page">
      <Swiper imgArr={swipers} onSwiperItemClick={onSwiperItemClick}></Swiper>
      <HomeItem title={'热播电影'} movies={dy} />
      <HomeItem title={'热播影视'} movies={dsj} />
      <HomeItem title={'热播综艺'} movies={zy} />
      <HomeItem title={'热播动漫'} movies={dm} />
    </div>
  );
};
export default HomeMain;
