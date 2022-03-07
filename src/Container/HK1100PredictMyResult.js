import React, {  useState } from 'react';
import { useTranslation } from 'react-i18next';

import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {
    Link
} from "react-router-dom";
import GeneralTable from "../Component/GeneralTable"
import Paper from '@material-ui/core/Paper';
import LargeTextPaperSkeleton from "../Component/LargeTextPaperSkeleton"

const useStyles = makeStyles((theme) => ({
    root:{
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
    probiTableWrapper: {
        
        marginTop: '25px',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
          },
    }
}));

function HK1100PredictMyResult() {
    const classes = useStyles();
    const [methodResultData, setMethodResultData] = useState()

    const [bg, setBg] = useState();
    const [fetching, setFetching] = useState(false);

    const [finishPoint, setFinishPoint] = useState(0);
    const [hour, setHour] = useState(2);
    const [min, setMin] = useState(15);
    const [eta, setEta] = useState()
    const [weighting, setWeigting] = useState([])
    const { t } = useTranslation();

    let equation = [7.2718, 4.2238, 3.2606, 2.6337, 2.2234, 1.6402, 1.4081, 1.2645, 1.1197]



    let AccumEPDistance = (data) => {
        if (data) {
            let EPDistance = []
            for (let i = 0; i < data.length; i++) {
                if (i === 0)
                    EPDistance[i] = data[i]['effort point'] + data[i + 1]['effort point']
                else if (i < data.length - 3)
                    EPDistance[i] = EPDistance[i - 1] + data[i + 1]['effort point']
            }
            let arr = []
            arr.push((equation[finishPoint] * (hour + min / 60)).toFixed(2))
            arr.push(((hour + min / 60) * EPDistance[EPDistance.length - 1] / EPDistance[finishPoint]).toFixed(2))
            arr.push(((hour + min / 60) * Math.pow(EPDistance[EPDistance.length - 1] / EPDistance[finishPoint], 1.06)).toFixed(2))
            setEta(arr)
            let tmpWeighting = [[], [], []]
            tmpWeighting[0] = equation.map((item, index) => {
                if (index === 0)
                    return 1 / item
                else
                    return 1 / item - (1 / equation[index - 1])
            })
            tmpWeighting[0].push(1 - 1 / equation[equation.length - 1])

            // set weighting for chung and chungplus method
            for (let i = 0; i < data.length; i++) {
                if (i !== 0 && i !== data.length - 1)
                    tmpWeighting[1].push(data[i]['effort point'] / data[data.length - 1]['effort point'])
            }
            tmpWeighting[2] = tmpWeighting[1]
            setWeigting(tmpWeighting)
        }
    }


    let handleButtonClick = () => {
        if (finishPoint !== null && hour !== null && min !== null) {
            if (!bg) {
                setFetching(true)
                axios.get('https://api.npoint.io/aaa03b744297ade7313d')
                    .then(function (response) {
                        // handle success
                        setBg(response.data)
                        AccumEPDistance(response.data)
                        setFetching(false)
                    }).catch((error) => {
                        console.log(error)
                        alert(error)
                        setFetching(false)
                    })
                    axios.get('https://api.npoint.io/302fdd3ac3998e83dd4f')
                    .then(function (response) {
                        // handle success
                        setMethodResultData(response.data)
                    })
            } else {
                AccumEPDistance(bg)
            }

        } else {
            alert('Missing Field(s)!')
        }

    }

    return (
        <React.Fragment>
            <Toolbar />
            <div className={classes.root}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={classes.contentWrapper}>
                        <Typography variant="h3" gutterBottom>
                            {t('inputpredict.title')}
                </Typography>
                        <Typography variant="h5" gutterBottom>
                        {t('inputpredict.subtitle')}

                </Typography>
                    </div>
                </Paper>
                <Paper elevation={1} className={classes.paper}>
                    <div className={classes.formgroup}>
                        <TextField
                            id="finish"
                            select
                            label="Start Point"
                            helperText="Will Support Other Location Soon."
                            variant="outlined"
                            disabled
                            defaultValue='Starting Point/北潭沖'
                        >
                            {['Starting Point/北潭沖'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="finish"
                            select
                            label="Finish Point"
                            value={finishPoint}
                            onChange={e => setFinishPoint(e.target.value)}
                            helperText="Please select your Finsih Point"
                            variant="outlined"
                        >
                            {['cp2', 'cp3', 'cp4', 'cp5', 'cp6', 'cp7', 'cp8', 'cp9', 'cp10'].map((option, index) => (
                                <MenuItem key={option} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="hour"
                            select
                            label="Hour used"
                            value={hour}
                            onChange={e => setHour(e.target.value)}
                            variant="outlined"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="finish"
                            select
                            label="Minute used"
                            value={min}
                            onChange={e => setMin(e.target.value)}
                            variant="outlined"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            endIcon={<SendIcon />}
                            onClick={handleButtonClick}
                        >
                            Predict My HK100 Result
                </Button>
                    </div>
                </Paper>
                {(methodResultData && bg && eta && weighting.length === 3) ?

                    <Paper elevation={1} >
                        <div className={classes.resultWrapper}>
                            <Typography variant="h5" style={{marginBottom: '50px'}} >
                            {t('checkranking.modelintro')}
                <Link style={{ textDecoration: 'none' }} target="_blank" to={`${process.env.PUBLIC_URL}/hk100predict`} >{t('checkranking.modelintro2')} </Link>
                            </Typography>
                            {['Past Data', 'Chung', 'ChungPlus'].map((item, index) => {
                                return <React.Fragment key={index}>
                                    <Typography variant="h4" gutterBottom>
                                        {item} {t('inputpredict.eta')} {eta[index]} Hours
                                    </Typography>
                                    <Typography variant="h5">
                                         {t('inputpredict.split')}
                                        </Typography>
                                    <GeneralTable
                                        header={['Check Point', 'Distance (km)', 'Estimated Split Time (Hr)', 'Estimated  Pace (km/h)', 'Estimated EP Pace (km/h)']}
                                        content={['cp2', 'cp3', 'cp4', 'cp5', 'cp6', 'cp7', 'cp8', 'cp9', 'cp10', 'Finish'].map((item2, index2) => {
                                            if (index2 > finishPoint)
                                                return [item2, bg[index2 + 1]['dist'], (eta[index] * weighting[index][index2]).toFixed(2),
                                                    (bg[index2 + 1].dist / (eta[index] * weighting[index][index2])).toFixed(2),
                                                    (bg[index2 + 1]['effort point'] / (eta[index] * weighting[index][index2])).toFixed(2)]
                                        })}
                                        align={'center'}
                                    />
                                    <div className={classes.probiTableWrapper}>
                                        <Typography variant="h5">
                                            {`${item} ${t('inputpredict.acc')} `}
                                        </Typography>
                                        {index === 0 ? <GeneralTable
                                            header={['Predicted Time and Actual Time within:', 'Probability']}
                                            content={['0.5Hr', '1Hr', '1.5Hr', '2Hr', '2.5Hr', '3Hr', '3.5Hr', '4Hr'].map((item, index2) => {
                                                return [item, methodResultData[index][index2][`cp${finishPoint + 2}`].toFixed(4)]
                                            })}
                                            size={'small'}
                                            align={'center'}
                                            width='50%'
                                        /> :
                                            <GeneralTable
                                                header={['Predicted Time and Actual Time within:', 'Probability']}
                                                content={['0.5Hr', '1Hr', '1.5Hr', '2Hr', '2.5Hr', '3Hr', '3.5Hr', '4Hr', '4.5Hr', '5Hr', '5.5Hr', '6Hr'].map((item, index2) => {
                                                    return [item, methodResultData[index][index2][`sp${finishPoint + 2}`].toFixed(4)]
                                                })}
                                                size={'small'}
                                                align={'center'}
                                                width='50%'
                                            />
                                        }
                                    </div>

                                    <div style={{ marginBottom: '75px' }}></div>
                                </React.Fragment>
                            })}

                        </div>
                    </Paper>




                    : fetching && <LargeTextPaperSkeleton />
                }

            </div>
        </React.Fragment>

    )
}
export default HK1100PredictMyResult;
