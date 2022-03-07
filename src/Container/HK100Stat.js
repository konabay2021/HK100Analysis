import React, { useEffect, useState } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import LargeTextPaperSkeleton from "../Component/LargeTextPaperSkeleton"

import axios from 'axios'
import StatWrapper from '../Component/StatWrapper'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "1600px",
        margin: '0 auto',
        padding: 10,
        [theme.breakpoints.up('md')]: {
            padding: '20px'
        },
    },
    tab: {
        minWidth: 100
    },
    contentWrapper: {
        maxWidth: 1000,
        margin: '0 auto',
        padding: '10px',
        [theme.breakpoints.up('sm')]: {
            padding: '50px',
        },
        textAlign: 'center'
    },
    wrapper: {
        maxWidth: 1000,
        margin: '0 auto',
        padding: '5px',
        [theme.breakpoints.up('sm')]: {
            padding: '10px',
        },
        [theme.breakpoints.up('md')]: {
            padding: '20px',
        },
    },
    firstPaper: {
        marginBottom: 15
    }
}));

function HK100() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [dist, setDist] = useState();
    const [stat, setStat] = useState();
    const [bg, setBg] = useState();

    const { t } = useTranslation();


    useEffect(() => {
        axios.get('https://api.npoint.io/133efc2d2a769c930619')
            .then(function (response) {
                // handle success
                setStat(response.data)
            })
        axios.get('https://api.npoint.io/36ed2cb6de546b8660f3')
            .then(function (response) {
                // handle success
                setDist(response.data)
            })
        axios.get('https://api.npoint.io/aaa03b744297ade7313d')
            .then(function (response) {
                // handle success
                setBg(response.data)
            })
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <React.Fragment>

            <Toolbar />
            <div className={classes.root}>
                <Paper elevation={1} className={classes.firstPaper}>
                    <div className={classes.contentWrapper}>
                        <Typography variant="h3" gutterBottom>
                            {t('stat.title')}
                        </Typography>


                    </div>
                </Paper>
                <Paper elevation={3} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="full width tabs example"
                    >
                        <Tab className={classes.tab} label="Overall" />
                        {stat && stat.map((item, index) => {
                            if (index !== stat.length - 1)
                                return (
                                    <Tab key={index} className={classes.tab} label={`CP ${index + 1}`} />
                                )
                        })}
                    </Tabs>
                    {(bg && dist && stat) ? <SwipeableViews
                        enableMouseEvents={true}
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        {
                            stat.map((item, index) => {
                                if (index ===0)
                                   return <div key={index} className={classes.wrapper}>
                                        <StatWrapper
                                            data={stat[stat.length - 1]}
                                            bg={bg[stat.length - 1]}
                                            dist={dist[stat.length - 1]}
                                            index={'Overall'}
                                        />
                                    </div>
                                else
                                    return <div key={index} className={classes.wrapper}>
                                        <StatWrapper
                                            data={item}
                                            bg={bg[index]}
                                            dist={dist[index]}
                                            index={index}
                                        />
                                    </div>
                            })
                        }

                    </SwipeableViews > :
                        <LargeTextPaperSkeleton />
                    }

                </Paper>
            </div>

        </React.Fragment >

    )
}
export default HK100;
