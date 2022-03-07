import React, { useEffect, useState } from 'react';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
 
}));
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
function GeneralTable(props) {
    const classes = useStyles();
    const theme = useTheme();
    let { title, header,content } = props
    return (
        <div>
            <TableContainer>
                <Typography variant="h4" gutterBottom>
                    {title && title}
                </Typography>
                <Table aria-label="simple table" size={props.size}>
                    <TableHead>
                        <TableRow>
                            {header && header.map((item, index) => {
                                return <StyledTableCell style={{width: props.width}} key={index} align={props.align ? props.align : 'right'}>{item}</StyledTableCell >
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content && content.map((item, index) => {
                            return <StyledTableRow key={index}  >
                                {item &&  item.map((item2, index2) => {
                                    return <StyledTableCell  key={index2} align={props.align ? props.align : 'right'}>{item2}</StyledTableCell >
                                })}
                            </StyledTableRow >
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}
export default GeneralTable;
