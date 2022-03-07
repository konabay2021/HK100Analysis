import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import PredictTextField from "../Component/PredictTextField"
import StatWrapper from '../Component/StatWrapper'
import { TextareaAutosize } from '@material-ui/core';
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'white'
    },
    tab: {
        minWidth: 150
    },
    contentWrapper: {
        maxWidth: 1920,
        margin: '0 auto',
        [theme.breakpoints.up('md')]: {
            padding: '25px'
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
    },
    imgresponsive: {
        width: "100%",
        height: 'auto'
    },
    gridItem: {
        marginBottom: '25px',
        padding: '10px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    navButton: {
        marginBottom: '5px',

    }

}));

function HK100() {
    const classes = useStyles();

    const { t } = useTranslation();

    return (
        <div>
            <Toolbar />
            {/* <Paper elevation={1} className={classes.firstPaper}> */}
            <div className={classes.root}>
                <div className={classes.contentWrapper}>
                    <Grid container justify={'center'} alignItems="center">
                        <Grid md={5} item className={classes.gridItem}>
                            <Typography variant="h6" gutterBottom>
                                <strong> {t('home.be better prepared')}</strong>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Analyze your training data and predict your HK100 completion time')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Analyze your HK100 past results and find the best prediction model')}
                                    </Typography>
                                </li>
                            </ul>
                            <Typography variant="h6" gutterBottom>
                                <strong>       {t('home.Start Now')}</strong>
                            </Typography>

                            <Button className={classes.navButton} color="primary" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100predict`}>  {t('menu.1')}</Button>
                            <Button className={classes.navButton} color="primary" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100stat`}>  {t('menu.2')}</Button>
                            <Button className={classes.navButton} color="primary" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100checkranking`}>  {t('menu.3')}</Button>
                            <Button className={classes.navButton} color="primary" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100predictmyresult`}>  {t('menu.4')}</Button>
                        </Grid>
                        <Grid item md={6} lg={5} xs={12} className={classes.gridItem}>
                            <div>
                                <img src="https://i.imgur.com/1ayo7cR.jpg" alt="hk100" className={classes.imgresponsive} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justify={'center'} alignItems="center">


                        <Grid item md={6} lg={5} xs={12} className={classes.gridItem}>
                            <img src="https://i.imgur.com/uBv2FrS.jpg" alt="hk100" className={classes.imgresponsive} />


                        </Grid>
                        <Grid item md={5} xs={11} className={classes.gridItem}>
                            <Typography variant="h6" gutterBottom>
                                <strong> {t('home.Analyze My HK100 Result')}</strong>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Find the best prediction model')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Find your HK100 split time')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Find segment ranking')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Analysis of HK100 runner time distribution')}
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                    <Grid container justify={'center'} alignItems="center">


                        <Grid item md={5} xs={11} className={classes.gridItem}>
                            <Typography variant="h6" gutterBottom>
                                <strong> {t('home.Predict My HK100 Result')}</strong>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Enter training data')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Provide 3 different HK100 prediction models and their accuracy')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Predict runner completion time')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Estimate runner segment time')}
                                    </Typography>
                                </li>
                            </ul>


                        </Grid>
                        <Grid item md={6} lg={5} xs={12} className={classes.gridItem}>
                            <div>
                                <img src="https://i.imgur.com/3kj8s69.jpg" alt="hk100" className={classes.imgresponsive} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justify={'center'} alignItems="center">


                        <Grid item md={6} lg={5} xs={12} className={classes.gridItem}>
                            <div>
                                <img src="https://i.imgur.com/eroQRjI.jpg" alt="hk100" className={classes.imgresponsive} />
                            </div>
                        </Grid>
                        <Grid item md={5} xs={11} className={classes.gridItem}>
                            <Typography variant="h6" gutterBottom>
                                <strong> {t('home.Race Prediction Model')}</strong>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Compare three HK100 completion time prediction models')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Introduction of principles and assumptions behind')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Analyze the accuracy of the model')}
                                    </Typography>
                                </li>

                            </ul>
                        </Grid>


                    </Grid>
                    <Grid container justify={'center'} alignItems="center">


                        <Grid item md={5} xs={11} className={classes.gridItem}>
                            <Typography variant="h6" gutterBottom>
                                <strong>{t('home.HK100 Statistics')}</strong>
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Listed statistics of each segment')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Median, standard deviation, mean, etc.')}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" gutterBottom>
                                        {t('home.Provide detailed time distribution chart of HK100 participants')}
                                    </Typography>
                                </li>
                            </ul>

                        </Grid>
                        <Grid item md={6} lg={5} xs={12} className={classes.gridItem}>
                            <div>
                                <img src="https://i.imgur.com/rognDD2.jpgg" alt="hk100" className={classes.imgresponsive} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid className={classes.gridItem} >
                            <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>
                                <strong>  {t('home.Try Now')}!</strong>
                            </Typography>

                            <Button className={classes.navButton} style={{ display: 'block' }} color="primary" size="large" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100predict`}>  {t('menu.1')}</Button>
                            <Button className={classes.navButton} style={{ display: 'block' }} color="primary" size="large" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100stat`}>  {t('menu.2')}</Button>
                            <Button className={classes.navButton} style={{ display: 'block' }} color="primary" size="large" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100checkranking`}>  {t('menu.3')}</Button>
                            <Button className={classes.navButton} style={{ display: 'block' }} color="primary" size="large" disableElevation component={Link} to={`${process.env.PUBLIC_URL}/hk100predictmyresult`}>  {t('menu.4')}</Button>
                        </Grid>
                    </Grid>


                </div>



            </div>
            {/* // </Paper> */}

        </div>

    )
}
export default HK100;
