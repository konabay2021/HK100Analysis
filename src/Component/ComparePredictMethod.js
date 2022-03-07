import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Link
} from "react-router-dom";

import GeneralTable from "./GeneralTable"
const useStyles = makeStyles((theme) => ({
    tableWrapper: {
        paddingBottom: '50px'
    },
}));
function ComparePredictMethod(props) {
    const classes = useStyles();
    const theme = useTheme();
    let { runner, bg } = props
    let [pastDataVar, setPastDataVar] = useState()
    let [chungVar, setChungVar] = useState()
    let [chungPlusVar, setChungPlusVar] = useState()
    const { t } = useTranslation();


    let runnerDataToAccMode = (runnerData) => {

        for (let i = 0; i < runnerData.length; i++) {
            if (i < runnerData.length - 3)
                runnerData[i + 1] = runnerData[i] + runnerData[i + 1]
            else
                runnerData.pop()
        }
        runnerData.shift()
        return runnerData
    }
    let formatTableConent = (runnerData, predicatedTime, data) => {

        let ouputData = runnerData.map((item, index) => {
            return [`CP${index + 2}`, Math.round(item * 100) / 100, Math.round(predicatedTime[index] * 100) / 100, Math.round(data[data.length - 1] * 100) / 100, Math.round((predicatedTime[index] - data[data.length - 1]) * 100) / 100
                , `${Math.round((predicatedTime[index] - data[data.length - 1]) / data[data.length - 1] * 100 * 100) / 100}%`]
        })
        return ouputData
    }

    let AccumEPDistance = () => {
        if (bg) {
            let EPDistance = []
            for (let i = 0; i < bg.length; i++) {
                if (i === 0)
                    EPDistance[i] = bg[i]['effort point'] + bg[i + 1]['effort point']
                else if (i < bg.length - 3)
                    EPDistance[i] = EPDistance[i - 1] + bg[i + 1]['effort point']
            }
            return EPDistance
        }
    }
    let tmpPastDataPredictMethod = (data) => {
        let runnerData = runnerDataToAccMode([...data])
        let equtaion = [{ slope: 6.6728, y: 1.9216 }, { slope: 4.1018, y: 0.6741 }, { slope: 3.2376, y: 0.1649 }, { slope: 2.5969, y: 0.3272 }, { slope: 2.2188, y: 0.0487 }, { slope: 1.5941, y: 0.6583 }, { slope: 1.3408, y: 1.1222 }, { slope: 1.1987, y: 1.2229 }, { slope: 1.0838, y: 0.7521 }]
        let predicatedTime = runnerData.map((item, index) => {
            return item * equtaion[index].slope + equtaion[index].y
        })
        let tmp = (predicatedTime.reduce((accumulator, currentValue) => Math.abs(accumulator) + Math.abs(currentValue)) - (predicatedTime.length * data[data.length - 1])) / (predicatedTime.length * data[data.length - 1])
        tmp = (tmp * 100).toFixed(2)
        pastDataVar !== tmp && setPastDataVar(tmp)
        return formatTableConent(runnerData, predicatedTime, data)
    }
    let tmpChungPredictMethod = (data) => {
        let runnerData = runnerDataToAccMode([...data])
        let EPDistance = AccumEPDistance()
        let predicatedTime = runnerData.map((item, index) => {
            return item * bg[bg.length - 1]['effort point'] / EPDistance[index]
        })
        let tmp = (predicatedTime.reduce((accumulator, currentValue) => Math.abs(accumulator) + Math.abs(currentValue)) - (predicatedTime.length * data[data.length - 1])) / (predicatedTime.length * data[data.length - 1])
        tmp = (tmp * 100).toFixed(2)
        chungVar !== tmp && setChungVar(tmp)
        return formatTableConent(runnerData, predicatedTime, data)
    }
    let tmpChungPlusPredictMethod = (data) => {
        let runnerData = runnerDataToAccMode([...data])
        let EPDistance = AccumEPDistance()
        let predicatedTime = runnerData.map((item, index) => {
            return item * Math.pow((bg[bg.length - 1]['effort point'] / EPDistance[index]), 1.06)
        })
        let tmp = (predicatedTime.reduce((accumulator, currentValue) => Math.abs(accumulator) + Math.abs(currentValue)) - (predicatedTime.length * data[data.length - 1])) / (predicatedTime.length * data[data.length - 1])
        tmp = (tmp * 100).toFixed(2)
        chungPlusVar !== tmp && setChungPlusVar(tmp)
        return formatTableConent(runnerData, predicatedTime, data)
    }

    let findsmallest = () => {
        if (Math.abs(pastDataVar) <= Math.abs(chungVar) && Math.abs(pastDataVar) <= Math.abs(chungPlusVar))
            return 'Pass Data'
        else if (Math.abs(chungVar) <= Math.abs(pastDataVar) && Math.abs(chungVar) <= Math.abs(chungPlusVar))
            return "Chung"
        else
            return "ChungPlus"
    }


    return (
        <div>
            <div>
                <Typography variant="h5" className={classes.tableWrapper}>
                    {t('checkranking.modelintro')}
                <Link style={{ textDecoration: 'none' }} target="_blank" to={`${process.env.PUBLIC_URL}/hk100predict`} >{t('checkranking.modelintro2')} </Link>
                </Typography>
                <Typography variant="h5" >
                    摘要
                </Typography>
                <Typography variant="body1" >
                    Past Data {t('checkranking.avgerror')}: {pastDataVar}%
                </Typography>
                <Typography variant="body1" >
                    Chung {t('checkranking.avgerror')}:  {chungVar}%
                </Typography>
                <Typography variant="body1" className={classes.tableWrapper}>
                    ChungPlus {t('checkranking.avgerror')}:  {chungPlusVar}%
                </Typography>
                <Typography variant="h6" className={classes.tableWrapper}>
                {t('checkranking.ofyou')}  {findsmallest()}  {t('checkranking.best')}
                </Typography>
            </div>
            <div className={classes.tableWrapper}>
                <GeneralTable
                    title={'Past Data Method'}
                    header={['Check Point', ' Accumulated time (Hr)', 'Predicted Finishing Time (Hours)', 'Actual Finishing Time (Hours)', 'Difference (Hours)', 'Percentage Error']}
                    content={runner && tmpPastDataPredictMethod(runner)}
                />
            </div>
            <div className={classes.tableWrapper}>
                <GeneralTable
                    title={'Chung Method'}
                    header={['Check Point', ' Accumulated time (Hr)', 'Predicted Finishing Time (Hours)', 'Actual Finishing Time (Hours)', 'Difference (Hours)', 'Percentage Error']}
                    content={runner && bg && tmpChungPredictMethod(runner)}
                />
            </div>
            <div className={classes.tableWrapper}>
                <GeneralTable
                    title={'ChungPlus Method'}
                    header={['Check Point', ' Accumulated time (Hr)', 'Predicted Finishing Time (Hours)', 'Actual Finishing Time (Hours)', 'Difference (Hours)', 'Percentage Error']}
                    content={runner && tmpChungPlusPredictMethod(runner)}
                />
            </div>


        </div>

    )
}
export default ComparePredictMethod;
