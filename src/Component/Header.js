
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TranslateIcon from '@material-ui/icons/Translate';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { ThemeProvider } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import { createBrowserHistory } from "history";
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import TimerIcon from '@material-ui/icons/Timer';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';
import getLanguage from "../getLanguage"

import {

    Link
  } from "react-router-dom";
  const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: 'white',
      color: 'black'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    appBarContent: {
      [theme.breakpoints.up('md')]: {
        // display: 'flex',
        // justifyContent: "space-between"
      },
    },
    homeName: {
      // [theme.breakpoints.down('sm')]: {
      flexGrow: 1
      // },
    }
  }));

export default function Header(){
  const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const { t, i18n } = useTranslation();
    // const theme = useTheme();
    const showmenu = !useMediaQuery(useTheme().breakpoints.up('md'));
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handLangChange = (val) => {
      setAnchorEl(null);
      i18n.changeLanguage(val)
    }
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.appBarContent}>
              {showmenu && <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setDrawer(true)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>}

              <Typography className={classes.homeName} component={Link} to={`${process.env.PUBLIC_URL}/`} variant="h6" noWrap style={{ color: 'black', textDecoration: 'none' }}>{t('homename')} </Typography>
              {!showmenu &&
                <div style={{ marginRight: '50px' }}>
                  <Button component={Link} to={`${process.env.PUBLIC_URL}/hk100predict`} ><Typography varient="body1">{t('menu.1')}</Typography> </Button>
                  <Button component={Link} to={`${process.env.PUBLIC_URL}/hk100stat`} ><Typography varient="body1">{t('menu.2')}</Typography></Button>
                  <Button component={Link} to={`${process.env.PUBLIC_URL}/hk100checkranking`} ><Typography varient="body1">{t('menu.3')}</Typography></Button>
                  <Button component={Link} to={`${process.env.PUBLIC_URL}/hk100predictmyresult`} ><Typography varient="body1">{t('menu.4')}</Typography></Button>
                </div>
              }
              <div>
                {!showmenu &&
                  <Button
                    component={Link} to={`${process.env.PUBLIC_URL}/about`}
                    startIcon={<InfoIcon />}
                    style={{ marginRight: '15px' }}
                  >
                    <Typography varient="body1"> {"About"}</Typography>
                  </Button>}
                <Button
                  onClick={handleClick}
                  startIcon={<TranslateIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  <Typography varient="body1">  {getLanguage() === 'en' ? "English" : "中文"}</Typography>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handLangChange('en')}>English</MenuItem>
                  <MenuItem onClick={() => handLangChange('zh')}>中文</MenuItem>
                </Menu>
              </div>


            </Toolbar>
          </AppBar>
          {showmenu && <Drawer
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            open={drawer} onClose={() => setDrawer(false)}
          >


            <div className={classes.drawerContainer}>
              <List>
                <ListItem button onClick={() => setDrawer(false)} component={Link} to={`${process.env.PUBLIC_URL}`} >
                  <ListItemIcon> <HomeIcon /></ListItemIcon>
                  <ListItemText primary={t('homename')} />
                </ListItem>
                <Divider />
              </List>
              <List>
                <ListItem button onClick={() => setDrawer(false)} component={Link} to={`${process.env.PUBLIC_URL}/hk100predict`} >
                  <ListItemIcon> <ShowChartIcon /></ListItemIcon>
                  <ListItemText primary={t('menu.1')} />
                </ListItem>
                <ListItem button onClick={() => setDrawer(false)} component={Link} to={`${process.env.PUBLIC_URL}/hk100stat`} >
                  <ListItemIcon> <EqualizerIcon /></ListItemIcon>
                  <ListItemText primary={t('menu.2')} />
                </ListItem>
                <ListItem button onClick={() => setDrawer(false)} component={Link} to={`${process.env.PUBLIC_URL}/hk100checkranking`} >
                  <ListItemIcon> <PersonIcon /></ListItemIcon>
                  <ListItemText primary={t('menu.3')} />
                </ListItem>
                <ListItem button onClick={() => setDrawer(false)} component={Link} to={`${process.env.PUBLIC_URL}/hk100predictmyresult`} >
                  <ListItemIcon> <TimerIcon /></ListItemIcon>
                  <ListItemText primary={t('menu.4')} />
                </ListItem>
                <Divider />
              </List>
              <List>
                <ListItem button onClick={() => setDrawer(false)} component={Link} to={`${process.env.PUBLIC_URL}/about`} >
                  <ListItemIcon><InfoIcon /></ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItem>
                <Divider />
              </List>

            </div>
          </Drawer>}
        </React.Fragment>
    )
}