import React, { useState } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import AnalyzeRunnerResult from "../Component/AnalyzeRunnerResult"
import CompareRunnerResult from "../Component/CompareRunnerResult"
import ComparePredictMethod from "../Component/ComparePredictMethod"
import { useTranslation } from 'react-i18next';
import LargeTextPaperSkeleton from "../Component/LargeTextPaperSkeleton"


import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "1600px",
        margin: '0 auto',
        padding: 10,
        [theme.breakpoints.up('md')]: {
            padding: '20px'
        },
    },
    paper: {
        padding: '30px 0 ',
        marginBottom: '25px'
    },
    resultWrapper: {
        maxWidth: 1000,
        width: '90%',
        margin: '0 auto',
        padding: '50px 0'
    },
    formgroup: {
        width: 330,
        margin: '0 auto',
        '& .MuiFormGroup-root': {
            marginBottom: '15px',
        },
        '& .MuiTextField-root': {
            marginBottom: '15px',
            width: '100%',
        },
    },
    tab: {
        minWidth: 100
    },
    contentWrapper: {
        maxWidth: 1000,
        margin: '0 auto',
        padding: '25px 25px',
        textAlign: 'center'
    },
}));

function HK100CheckRanking() {
    const classes = useStyles();
    const theme = useTheme();
    const [result, setResult] = useState();
    const [dist, setDist] = useState();
    const [percentile, setPercentile] = useState();

    const [value, setValue] = useState(0);
    const { t, i18n } = useTranslation();


    const [bib, setBib] = useState();
    const [bg, setBg] = useState();
    const [fetching, setFetching] = useState(false);

    // const [name, setName] = useState();


    let handleButtonClick = () => {
        if (bib) {
            setFetching(true)
            setResult(false)
            axios.get('https://api.npoint.io/c885ad4ae2e215574b6a/' + bib)
                .then(function (response) {
                    // handle success
                    setResult(response.data)
                    if (!percentile)
                        axios.get('https://api.npoint.io/204b371874a961b52209')
                            .then(function (response) {
                                // handle success
                                setPercentile(response.data)
                            })
                    if (!bg)
                        axios.get('https://api.npoint.io/aaa03b744297ade7313d')
                            .then(function (response) {
                                // handle success
                                setBg(response.data)
                            })
                    if (!dist)
                        axios.get('https://api.npoint.io/36ed2cb6de546b8660f3')
                            .then(function (response) {
                                // handle success
                                setDist(response.data)
                            })
                    setFetching(false)
                }).catch((error) => {
                    console.log(error)
                    alert('404')
                    setFetching(false)

                })
        } else {
            alert('enter')
        }

    }
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
                <Paper elevation={1} className={classes.paper}>
                    <div className={classes.contentWrapper}>
                        <Typography variant="h3" gutterBottom>
                            {t(`checkranking.title`)}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {t(`checkranking.subtitle`)}
                        </Typography>

                    </div>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <div className={classes.formgroup}>
                        <FormLabel component="legend">Year</FormLabel>
                        <RadioGroup defaultValue="2020" aria-label="quiz" name="quiz" >
                            <FormControlLabel disabled value="2020" control={<Radio />} label="2020" />
                        </RadioGroup>
                        <TextField
                            label="BIB Number"
                            variant="outlined"
                            onChange={(e) => setBib(e.target.value)}
                            helperText="For example: 3481"

                        />
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            endIcon={<SendIcon />}
                            onClick={handleButtonClick}
                        >
                            Analyze My Result
                </Button>
                    </div>
                </Paper>

                {( dist && bg && result && percentile) ?
                    <React.Fragment>

                        <Paper elevation={1} className={classes.paper}>

                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab className={classes.tab} label="Summary" />
                                <Tab className={classes.tab} label="Compare" />
                                <Tab className={classes.tab} label="Predict Accurcy" />
                            </Tabs>
                        </Paper>

                        <SwipeableViews
                            enableMouseEvents={true}
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                            animateHeight={true}
                        >
                            <Paper elevation={1} >
                                <div className={classes.resultWrapper}>
                                    <AnalyzeRunnerResult
                                        runner={result}
                                        bg={bg}
                                    />
                                </div>
                            </Paper>
                            <CompareRunnerResult
                                percentile={percentile}
                                dist={dist}
                                runner={result}
                                bg={bg}
                            />
                            <Paper elevation={1} >
                                <div className={classes.resultWrapper}>
                                    <ComparePredictMethod
                                        runner={result}
                                        bg={bg}
                                    />
                                </div>
                            </Paper>


                        </SwipeableViews>
                    </React.Fragment>

                    : fetching && <LargeTextPaperSkeleton />
                }

            </div>
        </React.Fragment>

    )
}
export default HK100CheckRanking;
