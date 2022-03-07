import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import Modal from "../Component/Modal"
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export default function CustomTable(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <TableContainer>
            <Typography variant="h3" gutterBottom>
                {props.title}
            </Typography>
            <Button onClick={handleClickOpen}
                startIcon={<HelpOutlineIcon />}
            >
                Help
            </Button>
            <Modal
                open={open}
                handleClose={handleClose}
            />
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">Probi of Predicted Time and Actual Time within: </StyledTableCell >
                        {props.data && Object.keys(props.data[1]).map((i, index) => {
                            return <StyledTableCell key={index} align="right">{i}</StyledTableCell >
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data && props.data.map((item, index) => {
                        return <StyledTableRow key={index}  >
                            <StyledTableCell align="center">{index / 2 + 0.5}Hr</StyledTableCell >
                            {Object.values(item).map((i, index2) => {
                                return <StyledTableCell key={index2} align="right">{Math.round(i * 10000) / 10000}</StyledTableCell >
                            })}
                        </StyledTableRow >
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}