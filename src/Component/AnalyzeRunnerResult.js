import React, { useEffect, useState } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import GeneralTable from "./GeneralTable"
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({

}));

function AnalyzeRunnerResult(props) {
    const classes = useStyles();
    const theme = useTheme();
    let { runner, bg } = props
    const { t } = useTranslation();

    let formatData = (data) => {
        return data.map((item, index) => {
            return [index + 1 === runner.length ? 'Finish' : `CP${index + 1}`, item.toFixed(2), bg[index].dist.toFixed(2), (bg[index].dist / item).toFixed(2), (bg[index]['effort point'] / item).toFixed(2)]
        })
    }

    return (
        <React.Fragment>
            <div >
                <GeneralTable
                    title={t('checkranking.summary')}
                    header={['Check Point', ' Time (Hr)', 'Distance (km)', 'Avg. Speed (km/h)', 'Avg. ADJ Speed (km/h)']}
                    content={bg && runner && formatData(runner)}
                />
            </div>
        </React.Fragment>

    )
}
export default AnalyzeRunnerResult;
