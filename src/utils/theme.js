import { createMuiTheme } from '@material-ui/core/styles';


const themeDark = createMuiTheme({
  palette : {
    type : "dark",
    primary : { 
      main : "#212121",
    },
    secondary : {
      main : "#757575"
    }
  }
});

const themeNormal = createMuiTheme({
  palette : {
    primary : {
      main : "#009688"
    },
    secondary : {
      main : "#009688"
    }
  }
});

const ThemeArr = {
  "dark" : themeDark,
  "light" : themeNormal
}

const getThemeLocal = ()=>{
  const themeLocal = localStorage.getItem("themelocal") || "light";
  return ThemeArr[themeLocal];
};
const setThemeLocal = (type)=>{
  localStorage.setItem("themelocal",type);
};

const defaultTheme = getThemeLocal();


export default {
  defaultTheme,ThemeArr,setThemeLocal
}