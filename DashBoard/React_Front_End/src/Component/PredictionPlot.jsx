import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PredictionPlot = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for month
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for day
    return `${year}-${month}-${day}`; // Return formatted date
  };

  const handlePredict = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
        const response = await axios.post(
          // "http://localhost:5000/api/predict",
          "https://brent-oil-price-change-point-analysis.onrender.com/api/predict",
          {
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
          }
        );

      const transformedData = Object.keys(response.data.Date).map((key) => ({
        date: formatDate(response.data.Date[key]),
        // date: response.data.Date[key],
        predicted_price: response.data["Predicted Price"][key],
      }));

      console.log("Transformed Predictions:", transformedData);
      setPredictions(transformedData);
      //   setPredictions(response.data);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const chartData = {
    labels: predictions.map((prediction) => prediction.date),
    datasets: [
      {
        label: "Predicted Price",
        data: predictions.map((prediction) => prediction["predicted_price"]),
        fill: true,
        borderColor: "#080808",
        backgroundColor: "#fff",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="predict-container">
      <p className="plot-title">Predict Future Prices</p>
      <div className="date-range-container">
        <div>
          <label className="analysis-dropdown-label">Start Date:</label>
          <DatePicker
            selected={startDate}
            // disabled
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
          />
        </div>
        <div>
          <label className="analysis-dropdown-label">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
          />
        </div>
      </div>
      <button className="predict-btn" onClick={handlePredict}>
        Get Predictions
      </button>

      {predictions.length > 0 && (
        <div
          //   style={{ width: "80%", marginTop: "20px" }}
          className="plot"
        >
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
      )}
    </div>
  );
};

export default PredictionPlot;
