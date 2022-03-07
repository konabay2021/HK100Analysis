import React from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

export default function BarChart(props) {
  const { t } = useTranslation();

  if (props.position) {
    let keys = props.unit === 'Hr' ? Object.keys(props.dist).map(i => i / 2 * 10 * 60) : Object.keys(props.dist).map(i => Math.round(i * 60))
    let marked = false
    var backgroundColor = keys.map((item, index) => {
      if (props.position * 60 < item && !marked) {
        marked = true
        return "red"
      }
      return 'rgba(54,162,235,0.8)'
    })
    marked = false
    var hoverbackgroundColor = keys.map((item, index) => {
      if (props.position * 60 < item && !marked) {
        marked = true
        return "red"
      }
      return 'rgba(54,162,235,1)'
    })
  }
  const data = props.dist && {
    labels: props.unit === 'Hr' ? Object.keys(props.dist).map(i => Math.round(i / 2 * 10 * 10) / 10) : Object.keys(props.dist).map(i => Math.round(i * 60)),
    datasets: [
      {
        label: 'Number of Runner',
        backgroundColor: backgroundColor ? backgroundColor : 'rgba(54,162,235,0.8)',
        borderColor: hoverbackgroundColor ? hoverbackgroundColor : 'rgba(54,162,235,1)',
        borderWidth: 1,
        hoverBackgroundColor: hoverbackgroundColor ? hoverbackgroundColor : 'rgba(54,162,235,1)',
        hoverBorderColor: hoverbackgroundColor ? hoverbackgroundColor : 'rgba(54,162,235,1)',
        data: Object.values(props.dist)
      }
    ]
  };
  return (
    <div>
      <Typography variant="h5" >
        {props.title &&  props.title }
      </Typography>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          responsive: true,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: `Time (in ${props.unit})`
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Number of Runner'
              }
            }]
          }
        }}
      />
    </div>
  );
}