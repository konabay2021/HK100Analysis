import React from 'react';
import { Scatter } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';



export default function ScatterChart(props) {
    const data = props.data1 && props.data2 && {
        labels: "tt",
        datasets: [
            {
                label: 'Number of Runner',
                backgroundColor: 'rgba(54,162,235,0.8)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54,162,235,1)',
                hoverBorderColor: 'rgba(54,162,235,1)',
                data: props.data1 && props.data1.map((item, index) => {
                    return ({
                        x: item,
                        y: props.data2 && props.data2[index]
                    })
                })
            }
        ]
    };
    return (
        <div>
            {props.data1 && props.data2 && 
            <React.Fragment>

            <Typography variant="h5" gutterBottom>
                {props.title && props.title}
                        </Typography>
                <Scatter
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
                                    labelString: `Predicted Time (in ${props.unit})`
                                },
                            }],
                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString:`Actual Time (in ${props.unit})`
                                }
                            }]
                        }
                    }}
                />
            </React.Fragment>
                }
        </div>
    );
}