import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BarChart from "./BarChart"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        padding: '5px',
        [theme.breakpoints.up('sm')]: {
            padding: '10px',
          },
          [theme.breakpoints.up('md')]: {
            padding: '20px',
          },
    },
    paperWarpper: {
        marginTop: '10px',
        [theme.breakpoints.up('sm')]: {
            margin: '10px',
          },
          [theme.breakpoints.up('md')]: {
            margin: '20px',
          },
    },
    textBottomMargin: {
        marginBottom: '35px'
    },
    doubleColumnWrapper: {
        maxWidth: '1600px',
        margin: '0 auto'
    }
}));
function CompareRunnerResult(props) {
    const classes = useStyles();
    const theme = useTheme();
    let { runner, dist, percentile, bg } = props
    const { t } = useTranslation();

    let percentileMark = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.4, 0.41, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.48, 0.49, 0.5, 0.51, 0.52, 0.53, 0.54, 0.55, 0.56, 0.57, 0.58, 0.59, 0.6, 0.61, 0.62, 0.63, 0.64, 0.65, 0.66, 0.67, 0.68, 0.69, 0.7, 0.71, 0.72, 0.73, 0.74, 0.75, 0.76, 0.77, 0.78, 0.79, 0.8, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99
    ]

    let ranking = (time, index) => {
        let keys = Object.keys(percentile);
        let position;

        for (let i = 0; i < percentile[keys[index]].length; i++) {
            if (time < percentile[keys[index]][i]) {
                return percentileMark[i]
            }
        }
        return percentileMark[percentileMark.length - 1]
    }
    return (
        <div>
            <div >
                <Paper elevation={1} className={classes.paper}>
                    <Typography align='center' variant="h4" className={classes.textBottomMargin}>
                        {t('checkranking.compare')}
                    </Typography>
                </Paper>
            </div>
            <Grid container className={classes.doubleColumnWrapper} alignItems='center'>




                {runner && percentile && dist  && runner.map((item, index) => {
                    return <Grid item xs={12} sm={6} key={index}>
                        <div className={classes.paperWarpper}>

                            <Paper elevation={1} className={classes.paper}>
                                <Typography variant="h4" className={classes.textBottomMargin}>


                                    {index === runner.length - 1 ? "Overall Result" : `From ${index === 0 ? "Starting Point" : 'CP' + (index)} To ${index === runner.length - 2 ? 'Finish Line' : 'CP' + (index + 1)}`}
                                </Typography>
                                <div> </div>
                                <BarChart
                                    dist={dist[index]}
                                    unit={index === runner.length - 1 ? 'Hr' : 'Min'}
                                    position={item}
                                    title={
                                        `Perentile:  ${Math.round(ranking(item, index) * 100)}th`
                                    }
                                />
                            </Paper>
                        </div>
                    </Grid>
                })}

            </Grid>
        </div>

    )
}
export default CompareRunnerResult;
