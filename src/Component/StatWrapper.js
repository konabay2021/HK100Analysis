import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import BarChart from "./BarChart"
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  
    tableWrapper: {
        maxWidth: 650,
        margin: '0 auto',
        padding: '50px 0'
    },
});

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

export default function StatWrapper(props) {
    const classes = useStyles();
    const { t } = useTranslation();
 
    return (
        <React.Fragment>

                <div className={classes.tableWrapper}>
                    {props.data &&
                        <TableContainer>
                            <Typography variant="h3" gutterBottom>
                                {props.index === 'Overall' ? t('stat.Overall') : `${t("stat.Check Point")} ${props.index} ${t("stat.to")} ${props.index + 1}`}
                            </Typography>
                         
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">Start - CP1</StyledTableCell >
                                        <StyledTableCell align="right">
                                            {props.index === 'Overall' ? 'Time (Hr)' : 'Time (Min)'}
                                        </StyledTableCell >
                                        <StyledTableCell align="right">Avg. Speed (km/h)</StyledTableCell >
                                        <StyledTableCell align="right">Avg. ADJ Speed (km/h)</StyledTableCell >
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">Mean</StyledTableCell >
                                        {props.index === 'Overall' ?
                                            <StyledTableCell align="right">{Math.round(props.data.mean * 100) / 100}</StyledTableCell >
                                            :
                                            <StyledTableCell align="right">{Math.round(props.data.mean * 60 * 100) / 100}</StyledTableCell >
                                        }
                                        <StyledTableCell align="right">{props.bg.dist / props.data.mean}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data.mean}</StyledTableCell >
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell align="right">SD</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data.sd * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">NA</StyledTableCell >
                                        <StyledTableCell align="right">NA</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">Min</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data.min * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data.min}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data.min}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">Max</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data.max * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data.max}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data.max}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">10%</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data[0.1] * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data[0.1]}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data[0.1]}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">25%</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data[0.25] * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data[0.25]}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data[0.25]}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">50%</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data[0.5] * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data[0.5]}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data[0.5]}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">75%</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data[0.75] * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data[0.75]}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data[0.75]}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">90%</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data[0.9] * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data[0.9]}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data[0.9]}</StyledTableCell >
                                    </StyledTableRow >
                                    <StyledTableRow  >
                                        <StyledTableCell align="right">99%</StyledTableCell >
                                        <StyledTableCell align="right">{Math.round(props.data[0.99] * 60 * 100) / 100}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg.dist / props.data[0.99]}</StyledTableCell >
                                        <StyledTableCell align="right">{props.bg['effort point'] / props.data[0.99]}</StyledTableCell >
                                    </StyledTableRow >
                                </TableBody>
                            </Table>
                        </TableContainer>}
                        </div>
                        <BarChart
                    dist={props.dist}
                    unit={props.index === 'Overall' ? 'Hr' : 'Min'}
                    title={t('stat.Time Distribution')}
                />
             
        </React.Fragment>

    );
}
