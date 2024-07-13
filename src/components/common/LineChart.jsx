"use client"
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'This year',
                    data: [12000, 19000, 3000, 5000, 2000, 30000, 45000],
                    borderColor: '#f8d0b9',
                    backgroundColor: '#fdf0e8',
                }, {
                    label: 'Last year',
                    data: [15000, 23000, 7000, 5000, 3000, 20000, 30000],
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