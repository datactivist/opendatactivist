import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getCellDataFromApi } from '../../lib/api';

const CellsBarChart = ({ filteredCells }) => {
  const [chart, setChart] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const tagCounts = filteredCells.reduce((counts, cell) => {
        cell.tags.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
        return counts;
      }, {});
      const chartData = {
        labels: Object.keys(tagCounts),
        datasets: [
          {
            label: 'Nombre de cells',
            data: Object.values(tagCounts),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#66BB6A',
              '#FF8A65',
              '#008080',
              '#7B1FA2',
              '#7CB342',
              '#FDD835',
              '#E64A19',
            ],
          },
        ],
      };

      if (chart) {
        chart.destroy();
      }

      const newChart = new Chart(chartContainer.current, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tags',
                font: {
                  weight: 'bold',
                },
              },
              ticks: {
                font: {
                  weight: 'bold',
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Nombre de cells',
                font: {
                  weight: 'bold',
                },
              },
              ticks: {
                beginAtZero: true,
                font: {
                  weight: 'bold',
                },
              },
            },
          },
        },
      });

      setChart(newChart);
    };
    fetchData();
  }, [filteredCells]);

  return <canvas ref={chartContainer} />;
};

export default CellsBarChart;
