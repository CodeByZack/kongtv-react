import {  createTheme } from '@mui/material/styles';


const themeDark = createTheme({
  palette : {
    mode : "dark",
    primary : { 
      main : "#212121",
    },
    secondary : {
      main : "#757575"
    }
  }
});

const themeNormal = createTheme({
  palette : {
    primary : {
      main : "#009688"
    },
    secondary : {
      main : "#009688"
    }
  }
});

const ThemeArr:any = {
  "dark" : themeDark,
  "light" : themeNormal
}

const getThemeLocal = ():string=>{
  const themeLocal = localStorage.getItem("themelocal") || "light";
  return ThemeArr[themeLocal];
};
const setThemeLocal = (type:string)=>{
  localStorage.setItem("themelocal",type);
};

const defaultTheme = getThemeLocal();


export default {
  defaultTheme,ThemeArr,setThemeLocal
}