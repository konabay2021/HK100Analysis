import React, { useEffect, useState } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CustomTable from '../Component/CustomTable'
import ScatterChart from '../Component/ScatterChart'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
// import Skeleton from '@material-ui/lab/Skeleton';
import PredictTextField from "../Component/PredictTextField"
import LargeTextPaperSkeleton from "../Component/LargeTextPaperSkeleton"

import StatWrapper from '../Component/StatWrapper'
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "1600px",
        margin: '0 auto',
        padding: '10px',
        [theme.breakpoints.up('md')]: {
            padding: '20px',
        },
    },
    tab: {
        minWidth: 150
    },
    contentWrapper: {
        maxWidth: 1000,
        margin: '0 auto',
        padding: '10px',
        [theme.breakpoints.up('sm')]: {
            padding: '50px',
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    firstPaper: {
        marginBottom: 15
    }
}));

function HK100() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [intro, setIntro] = useState();
    const [findings, setFindings] = useState()
    const [methodResultData, setMethodResultData] = useState()
    const [methodRawResultData, setMethodRawResultData] = useState()


    const { t } = useTranslation();

    useEffect(() => {
        axios.get('https://api.npoint.io/302fdd3ac3998e83dd4f')
            .then(function (response) {
                // handle success
                setMethodResultData(response.data)
            })
        axios.get('https://api.npoint.io/bcd17e9d6d69d7e41c7b')
            .then(function (response) {
                // handle success
                setMethodRawResultData(response.data)
            })
        axios.get('https://api.npoint.io/4caa836668ca5a1f673e')
            .then(function (response) {
                // handle success
                setIntro(response.data)
            })
        axios.get('https://api.npoint.io/5ea7c0b66302d24c48ea')
            .then(function (response) {
                // handle success
                setFindings(response.data)
            })


    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const title = ['Past Data', 'Chung', 'ChungPlus']
    return (
        <React.Fragment>

            <Toolbar />
            <div className={classes.root}>

                <Paper elevation={1} className={classes.firstPaper}>
                    <div className={classes.contentWrapper}>
                        <Typography variant="h3" gutterBottom align='center'>
                            {t('predict.title')}
                        </Typography>
                        <Typography variant="h5" gutterBottom align='center'>
                            {t('predict.subtitle')}

                        </Typography>

                    </div>
                </Paper>
                <Paper elevation={3}  >

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab className={classes.tab} label="Past Data" />
                        <Tab className={classes.tab} label="Chung" />
                        <Tab className={classes.tab} label="Chung Plus" />
                    </Tabs>
                    {(methodResultData && intro && findings && methodRawResultData) ?

                        <SwipeableViews
                            enableMouseEvents={true}
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                            // animateHeight={passData && chung && chungPlus && intro && findings && combineRawData[2] !== undefined
                            animateHeight={true}
                        >
                            {methodResultData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className={`${classes.contentWrapper}`}>
                                            {intro && <PredictTextField
                                                title={`${title[index]} 預測模型簡介`}
                                                subtitle={intro[index].subtitle}
                                                //array of string
                                                content={intro[index].content}
                                                assumptionTitle={intro[index].assumptionTitle}
                                                assumptionContent={intro[index].assumptionContent}
                                                methodName={title[index]}
                                            />}

                                            {findings && <PredictTextField
                                                methodName={title[index]}
                                                title={`${title[index]} 發現/結果摘要`}
                                                content={findings[index].content}
                                            />}
                                            <CustomTable
                                                title={title[index]}
                                                data={item}
                                            />
                                        </div>
                                        <Grid container>
                                            {methodRawResultData[index] &&
                                                Object.keys(methodRawResultData[index]).map((item, index2) => {
                                                    if (item !== 'adjtotaltime')
                                                        return (
                                                            <Grid item xs={12} md={6} xl={4} key={index2} style={{ padding: '20px' }}>
                                                                <ScatterChart
                                                                    data1={methodRawResultData[index][item]}
                                                                    data2={methodRawResultData[index].adjtotaltime}
                                                                    unit={'Hr'}
                                                                    title={`${t('predict.Actual Time against Predicted Time')} (CP${index2 + 2} - Finish)`}
                                                                />

                                                            </Grid>
                                                        )
                                                })
                                            }
                                        </Grid>
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                        : <LargeTextPaperSkeleton />
                    }
                </Paper>
            </div>
        </React.Fragment>

    )
}
export default HK100;
