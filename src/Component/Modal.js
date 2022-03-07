import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    responsive: {
        width: '100%',
        height: 'auto'
    }
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Modal(props) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    let { open, handleClose } = props

    return (
        <div>
            <Dialog fullScreen={fullScreen}  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='md'>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    How To Use The Table
        </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        The Table shows the accuracy of the prediction method. It shows the proportion of runner's predicted finshing time and actual finishing time located within the certain intervals.
                        The finishing time predication is done by using runner's data from the Starting Point to the Certain Check Point.
          </Typography>
                    <Typography gutterBottom>
                        The header respresents differnt Check Points in the race.  The left column represents the time difference between the predicted time and the actual time for a runner.
          </Typography>
                    <img src="https://i.imgur.com/1ayo7cR.jpg" alt="tableexample" className={classes.responsive} />
                    <Typography gutterBottom>
                        For example, the red square in the iamge below represents that by using the time of those runners consumed from Starting Point to Check Point 4 for predication,
                        84% of runner's finishing time located within 2.5 hours of the predicated time.
          </Typography>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}