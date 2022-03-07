import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';

import PredictTextField from "../Component/PredictTextField"
import StatWrapper from '../Component/StatWrapper'
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root:{
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
            padding: '50px 50px'
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
    }

}));

function HK100() {
    const classes = useStyles();

    const { t } = useTranslation();



    return (
        <React.Fragment>

            <Toolbar />
            <div className={classes.root}>
            <Paper elevation={1} className={classes.firstPaper}>
                <div className={classes.contentWrapper}>
                    <img src="https://i.imgur.com/w5yjUfD.jpg" alt="hk100" className={classes.imgresponsive} />
                    <div style={{ marginBottom: '50px' }}></div>

                    <Typography variant="h3" gutterBottom>
                        {t('about.About HK100 · Home')}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {t('about.website created by')}
                    </Typography>

                    <div style={{ marginBottom: '25px' }}></div>
                    <Typography variant="h6" gutterBottom>
                        {t('about.Purpose of establishment')}
                    </Typography>
                    <Typography variant="body1" >
                        {t('about.Analysis of HK100 statistics')}
                    </Typography>
                    <Typography variant="body1" >
                        {t('about.Help participants analyze their personal results')}
                    </Typography>
                    <Typography variant="body1" >
                        {t('about.Provide the best prediction model')}
                    </Typography>
                    <div style={{ marginBottom: '50px' }}></div>

                    <Typography variant="h4" gutterBottom>
                        {t('about.Support us')}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {t('about.Support method')}
                    </Typography>
                    <Typography variant="body1" >
                        {t('about.Use the website')}
                    </Typography>
                    <Typography variant="body1" >
                        {t('about.Promote to those around you')}
                    </Typography>
                    <Typography variant="body1" >
                        {t('about.Provide suggestions for improvement')}
                    </Typography>
                    <div style={{ marginBottom: '50px' }}></div>

                    <Typography variant="h4" gutterBottom>
                        {t('about.Conatact Us')}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {t('about.Email')} hk100analysis@gmail.com
                    </Typography>
                    <a target="_blank" href='https://www.linkedin.com/in/justin-so-4599bb162/'>
                        <img src="https://i.imgur.com/Zze1JVh.png" alt="LinkedIn" style={{ width: '100px' }} />

                    </a>




                </div>
            </Paper>
            </div>

        </React.Fragment>

    )
}
export default HK100;
