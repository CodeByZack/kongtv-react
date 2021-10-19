import Swiper from '../../../components/swiper';
import store from '../../../store';

const HomeMain = (props:any) => {
  const { data } = props;

  const dy = data.filter((movie:any) => movie.type_id_1 === 1);
  const dsj = data.filter((movie:any) => movie.type_id_1 === 2);
  const zy = data.filter((movie:any) => movie.type_id === 3);
  const dm = data.filter((movie:any) => movie.type_id === 4);

  const { detail, jumpUtil } = store.useContainer();
  const { jumpToDetail }:any = jumpUtil;

  const swipers = [dy[0], dsj[0], zy[0], dm[0], dy[1]].filter(i => i);

  const onSwiperItemClick = (movie:any) => {
    detail.setNowMovie(movie);
    jumpToDetail(movie);
  };

  return (
    <div className="home_main_page">
      <Swiper imgArr={swipers} onSwiperItemClick={onSwiperItemClick}></Swiper>
    </div>
  );
};
export default HomeMain;
