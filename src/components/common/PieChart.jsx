"use client"
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({data}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: ['Players', 'Brands', 'Admins'],
        datasets: [{
          data: data,
          backgroundColor: [
            '#ffab00',  // Orange
            '#00b8d4',  // Teal
            '#0052cc'   // Blue
          ],
          borderColor: [
            '#ffffff'  // White borders
          ],
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => myChart.destroy();  // Cleanup chart instance on component unmount
  }, []);

  return <canvas ref={chartRef} id="myPieChart"></canvas>;
};

export default PieChart;