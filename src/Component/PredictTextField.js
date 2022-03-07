import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: '50px'
    },
    title: {
        marginBottom: '50px'
    },
    subtitle: {
        marginBottom: '25px'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    textBottomMargin: {
        marginBottom: '35px'

    }

}));
export default function PredictTextField(props) {
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    let { title, subtitle, content, children, assumptionTitle, assumptionContent,methodName } = props
    if(methodName)
    return (
        <div className={classes.root}>

            {title && <Typography className={classes.title} variant="h3" className={classes.textBottomMargin}>
                {t(`predict.modeldesc.${methodName}.${title}`)}
            </Typography>}
            {subtitle && <Typography className={classes.subtitle} variant="h5" className={classes.textBottomMargin} >
                {t(`predict.modeldesc.${methodName}.${subtitle}`)}
            </Typography>}
            {content && content.map((item, index) => {
                if (Array.isArray(item)) {
                    return item.map((item2, index2) => {
                        return <Typography key={index2} variant="body1" className={item.length - 1 === index2 ? classes.textBottomMargin : ''} >
                            {t(`predict.modeldesc.${methodName}.${item2}`)}
                        </Typography>
                    })
                }
                return <Typography key={index} variant="body1" className={classes.textBottomMargin} >
                    {t(`predict.modeldesc.${methodName}.${item}`)}
                </Typography>
            })}
            {assumptionTitle && <Typography className={classes.subtitle} variant="h5" className={classes.textBottomMargin} >
                {t(`predict.modeldesc.${methodName}.${assumptionTitle}`)}
            </Typography>}
            {assumptionContent && assumptionContent.map((item, index) => {
                if (Array.isArray(item)) {
                    return item.map((item2, index2) => {
                        return <Typography key={index2} variant="body1" className={item.length - 1 === index2 ? classes.textBottomMargin : ''}>
                            {t(`predict.modeldesc.${methodName}.${item2}`)}
                        </Typography>
                    })
                }
                return <Typography key={index} variant="body1" >
                    {t(`predict.modeldesc.${methodName}.${item}`)}
                </Typography>
            })}
            <React.Fragment>
                {children}
            </React.Fragment>

        </div>
    );
}