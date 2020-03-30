import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChartSummary extends Component {
    render() {
        const {labels, datasets, title, backgroundColor, dataLabel} = this.props;

        return (
            <div>
                <Bar
                data={{
                    labels,
                    datasets: [
                        {
                            label: dataLabel,
                            data: datasets,
                            backgroundColor
                        }
                    ]
                }}
                width={100}
                height={70}
                options={{ 
                    title: {
                        text: title
                    }
                }}
                />
            </div>
        )
    }
}
