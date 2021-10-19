import React from 'react';
import { RouteComponentProps } from "@reach/router";
import HomeMain from './HomeMain'
import store from '../../store';
interface IProps extends RouteComponentProps {};


const Home = (props : IProps)=>{
    const { home } = store.useContainer();
    const {  adviceMovieList } = home;
    return (
        <HomeMain data={adviceMovieList}/>
    );
}
export default Home;