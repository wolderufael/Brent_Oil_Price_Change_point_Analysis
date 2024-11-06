import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { ClipLoader } from "react-spinners";

// Register the required components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  annotationPlugin
);

const PriceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/change_point_detection"
          "https://brent-oil-price-change-point-analysis.onrender.com/api/change_point_detection"
        );
        const data = response.data;

        const labels = Array.isArray(data.Date)
          ? data.Date
          : Object.values(data.Date);
        const prices = Array.isArray(data.Price)
          ? data.Price
              : Object.values(data.Price);
        const changePoints = data.change_points;


        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Price",
              data: prices,
              borderColor: "#4db633",
              backgroundColor: "#77a770",
              fill: true,
            },
          ],
          // Store change points for annotations
          changePoints,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If the data hasn't loaded yet, show a loading message
  if (!chartData) return (
    <div className="spinner-container">
      <ClipLoader color="#5a1ee7" size={100} />
      <p>Loading ...</p>
    </div>
  );

  // Configure annotations for each change point date
  const annotations = chartData.changePoints.map((date) => ({
    type: "line",
    xMin: date, // Date on the X-axis
    xMax: date, // Same date for vertical line
    borderColor: "red",
    borderWidth: 2,
    borderDash: [5, 5], // Dashed line
    label: {
    //   display: true,
      content: "CP",
      position: "top",
    },
  }));

  return (
    <div className="chart-container">
      <p className="plot-title">Detected Change Points</p>
      <Line
        data={{
          labels: chartData.labels,
          datasets: chartData.datasets,
        }}
        options={{
          scales: {
            x: {
              title: { display: true, text: "Date" },
              ticks: {
                color: "#fff", // Color for x-axis labels
              },
              type: "category", // Ensure the x-axis is treated as categorical data
              labels: chartData.labels, // Pass labels explicitly
            },
            y: {
              title: { display: true, text: "Price" },
              ticks: {
                color: "#fff", // Color for y-axis labels
              },
            },
          },
          plugins: {
            annotation: {
              annotations: annotations, // Add the configured annotations
            },
          },
        }}
      />
    </div>
  );
};

export default PriceChart;
