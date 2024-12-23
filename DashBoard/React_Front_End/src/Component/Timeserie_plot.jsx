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
import { ClipLoader } from "react-spinners";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const PriceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/time_series"
          "https://brent-oil-price-change-point-analysis.onrender.com/api/time_series"
        );
          const data = response.data;
           const labels = Array.isArray(data.Date)
             ? data.Date
             : Object.values(data.Date);
           const prices = Array.isArray(data.Price)
             ? data.Price
             : Object.values(data.Price);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Price",
              data: prices,
              borderColor: "#000",
              backgroundColor: "#fff",
              fill: true,
            },
          ],
        });
        // console.log(Array.isArray(data.Date), data.Date);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If the data hasn't loaded yet, show a loading message
  if (!chartData) return (
    <div className="spinner-container">
      <ClipLoader color="#5a1ee7"  size={100} />
      <p>Loading ...</p>
    </div>
  );

  return (
    <div className="chart-container">
      <p className="plot-title">Price Over Time</p>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#fff", // Set this to the color you want for the labels
              },
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Date", color: "red" },
              ticks: {
                color: "#fff", // Color for x-axis labels
              },
            },

            y: {
              title: { display: true, text: "Price", color: "red" },
              ticks: {
                color: "#fff", // Color for y-axis labels
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PriceChart;
