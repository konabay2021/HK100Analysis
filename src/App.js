import React, { useState } from 'react';
import { makeStyles, unstable_createMuiStrictModeTheme as createMuiTheme, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HK100Stat from "./Container/HK100Stat"
import HK100Predict from "./Container/HK100Predict"
import HK100CheckRanking from "./Container/HK100CheckRanking"
import HK1100PredictMyResult from "./Container/HK1100PredictMyResult"
import About from "./Container/About"
import Home from "./Container/Home"
import Header from "./Component/Header"

const history = createBrowserHistory();
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '微軟正黑體',
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100%'
  },
}));
export default function App() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>

          <CssBaseline />
          <Header />
          <div className={classes.content}>
            <Switch>
              <Route path={`${process.env.PUBLIC_URL}/hk100stat`} exact component={HK100Stat} />
              <Route path={`${process.env.PUBLIC_URL}/hk100predict`} exact component={HK100Predict} />
              <Route path={`${process.env.PUBLIC_URL}/hk100checkranking`} exact component={HK100CheckRanking} />
              <Route path={`${process.env.PUBLIC_URL}/hk100predictmyresult`} exact component={HK1100PredictMyResult} />
              <Route path={`${process.env.PUBLIC_URL}/about`} exact component={About} />
              <Route path={`${process.env.PUBLIC_URL}/`} component={Home} />


            </Switch>

          </div>
        </div>
      </ThemeProvider>
    </Router>

  );
}
