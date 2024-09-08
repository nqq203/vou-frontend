"use client"
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({dataThisYear, dataLastYear}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
                datasets: [{
                    label: 'This year',
                    data: dataThisYear,
                    borderColor: '#f8d0b9',
                    backgroundColor: '#fdf0e8',
                }, {
                    label: 'Last year',
                    data: dataLastYear,
                    borderColor: '#f19867',
                    backgroundColor: '#fdf0e8',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => myChart.destroy();
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

export default LineChart;