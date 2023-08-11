import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import Papa from 'papaparse';

const RadarChart = () => {
  const [chartData, setChartData] = useState([]);
  const redColor = 'red'; // Change this to the desired red color value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.csv');
        const text = await response.text();
        const parsedData = Papa.parse(text, { header: true });
        const categories = Object.keys(parsedData.data[0]).slice(1);

        const datasets = parsedData.data.map((row, index) => {
          const dataValues = categories.map((category) => parseInt(row[category], 10));

          return {
            label: row.Category,
            data: dataValues,
            backgroundColor: redColor, // Set the desired red color here
            borderColor: 'transparent', // Set border color to transparent
            pointBackgroundColor: redColor, // Set the same red color for point backgrounds
          };
        });

        setChartData(datasets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData.map((data, index) => (
        <div key={index} style={{ width: '500px' }}>
          <h2>Chart {index + 1}</h2>
          <Radar
            data={{
              labels: chartData.length > 0 ? chartData[0].data.map((_, i) => `Category ${i + 1}`) : [],
              datasets: [data],
            }}
            options={{
              scales: {
                r: {
                  beginAtZero: true,
                  grid: {
                    color: 'black', // Change this to a contrasting color for grid lines
                  },
                  pointLabels: {
                    fontColor: 'black', // Change this to a contrasting color for point labels
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default RadarChart;
