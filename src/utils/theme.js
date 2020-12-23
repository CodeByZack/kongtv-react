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

export default {
  themeDark,themeNormal
}